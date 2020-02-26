/*

	IMPORTANT!
	This implementation includes publishing and consuming for the same client.
	Do not publish and consume for the same channel. Do not publish with one channel for multiple goroutines.
	Create multiple instances with the same name.
	See more here: https://github.com/streadway/amqp/issues/283

	> Use a separate channel for publishing and if you publish from multiple goroutines, one channel per goroutine.

	Example:

	func rabbitHandler(text string) {
		fmt.Printf("Got message from rabbit: '%s'\n", text)
	}

	func main() {
		url := "amqp://127.0.0.1/"
		rabbitConsume := rabbit.NewClient(url, "test")
		rabbitConsume.Connect()
		rabbitConsume.RegisterHandler(rabbitHandler)
		defer rabbitConsume.Close()

		rabbitPublish := rabbit.NewClient(url, "test")
		rabbitPublish.Connect()
		defer rabbitPublish.Close()
		for i := 0; i < 10; i++ {
			rabbitPublish.PublishText("hello there!")
		}
	}

*/

package rabbit

// https://github.com/3onyc/docker-events-amqp

import (
	"encoding/json"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/streadway/amqp"
	"go.uber.org/ratelimit"
	"log"
	"time"
)

type RabbitClient struct {
	url			string
	queueName	string
	connection	*amqp.Connection
	channel		*amqp.Channel
}

type Handler func(messageBag *MessageBag)

type MessageBag struct {
	PostId int64 // optional
	Message tgbotapi.MessageConfig
	Priority uint8 // 0..9
}

func (rc *RabbitClient) Connect() {
	for {
		var err error

		rc.connection, err = amqp.Dial(rc.url)
		if err != nil {
			log.Printf("Can't connect to rabbit %s, will retry after 1 sec: %s\n", rc.url, err)
			time.Sleep(time.Second * 1)
			continue
		}

		rc.channel, err = rc.connection.Channel()
		if err != nil {
			rc.Close()
			log.Printf("Can't create channel (connect was ok) for rabbit %s, will retry after 1 sec: %s\n", rc.url, err)
			time.Sleep(time.Second * 1)
			continue
		}

		args := make(amqp.Table)
		args["x-message-ttl"] = int32(1000 * 60 * 60 * 24 * 10) // 10 days
		args["x-max-priority"] = int32(255)

		_, err = rc.channel.QueueDeclare(
			rc.queueName,
			true,
			false,
			false,
			false,
			args,
		)

		if err != nil {
			rc.Close()
			log.Printf("Can't declare queue (connect, channel were ok) for rabbit %s, will retry after 1 sec: %s\n", rc.url, err)
			time.Sleep(time.Second * 1)
			continue
		}

		break
	}
}

func (rc *RabbitClient) PublishTgMessage(messageBag MessageBag) {
	for {
		body, err := json.Marshal(messageBag)

		if err != nil {
			log.Println("Error marshaling a message.")
			log.Println(err)
			return
		}

		log.Printf("Publishing %+v ...\n", string(body))

		err = rc.channel.Publish(
			"",
			rc.queueName,
			false,
			false,
			amqp.Publishing{
				DeliveryMode: amqp.Persistent, // so the message will be save on RabbitMQ restart
				ContentType: "text/plain",
				Body: body,
				Priority: messageBag.Priority,
			})

		if err != nil {
			log.Printf("Can't publish text '%s', will retry in 1 sec: %s", string(body), err)
			rc.Close()
			rc.Connect()
			time.Sleep(time.Second * 1)
			continue
		}

		break
	}
}

func (rc *RabbitClient) msgRoutine(f Handler) {
	var msgs <-chan amqp.Delivery
	var err error

	for {
		err = rc.channel.Qos(
			1,
			0,
			false,
		)

		if err != nil {
			log.Printf("Can't set Qos, will retry in 1 sec: %s\n", err)
			rc.Close()
			rc.Connect()
			time.Sleep(time.Second * 1)
			continue
		}

		msgs, err = rc.channel.Consume(
			rc.queueName,
			"",
			false, // important to keep false, so messages will remain in RabbitMQ on app restart
			false,
			false,
			false,
			nil,
		)

		if err != nil {
			log.Printf("Can't consume from channel for url %s, will retry in 1 sec: %s\n", rc.url, err)
			rc.Close()
			rc.Connect()
			time.Sleep(time.Second * 1)
			continue
		}

		break
	}

	rl := ratelimit.New(28) // per second

	for d := range msgs {

		messageBag := &MessageBag{}
		err := json.Unmarshal(d.Body, messageBag)

		if err != nil {
			log.Println("Error unmarshalling a message")
			log.Println(err)
		} else {
			rl.Take() // IMPORTANT! Apply rate limit here, otherwise we're screwed while mass-sending
			go f(messageBag)
		}

		// Ack in any case, we don't want this handler to stuck because of one error
		d.Ack(false)
	}
}

func (rc *RabbitClient) RegisterHandler(f Handler) {
	go rc.msgRoutine(f)
}

func (rc *RabbitClient) Close() {
	if rc.channel != nil {
		rc.channel.Close()
	}
	if rc.connection != nil {
		rc.connection.Close()
	}
}

// IMPORTANT: use `defer rabbit.Close()` to close connection

func NewRabbitClient(url string, queueName string) *RabbitClient {
	rabbit := &RabbitClient{
		url: url,
		queueName: queueName,
	}
	rabbit.Connect()
	log.Println("Successfully connected to RabbitMQ")
	return rabbit
}
