package sender

import (
	"libretaxi/context"
	"libretaxi/rabbit"
	"log"
)

type Sender struct {
	context *context.Context
}

func (s *Sender) Handler(messageBag *rabbit.MessageBag) {
	log.Printf("Sending message %+v\n", messageBag.Message)

	// TODO: save message id, so we can delete it later if needed
	// the following table can be used:
	//
	// create table if not exists posted_messages
	// (
	//   "toUserId" bigint not null,
	//   "postId" bigint not null,
	//   "removed" boolean default(false),
	//   "postedAtUtc" timestamp without time zone not null default (now() at time zone 'utc')
	// );

	_, err := s.context.Bot.Send(messageBag.Message)
	if err != nil {
		log.Printf("Error sending Telegram message: %s\n", err)
	}
}

func (s *Sender) Start() {
	log.Println("Sender started")
	s.context.RabbitConsume.RegisterHandler(s.Handler)
}

func NewSender(context *context.Context) *Sender {
	sender := &Sender{
		context: context,
	}
	return sender
}
