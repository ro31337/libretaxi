package menu

import (
	"fmt"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/context"
	"libretaxi/objects"
	"log"
)

type Handler interface {
	Handle(user *objects.User, context *context.Context, message *tgbotapi.Message)
}

func isStateChanged(context *context.Context, previousState objects.MenuId, userId int64) (result bool) {
	user := context.Repo.FindUser(userId)

	if user == nil {
		return true
	}

	return user.MenuId != previousState
}

func oneTimeMessages(context *context.Context, user *objects.User) {
	// Send welcome link: on first interaction (here) or by mass-send (not implemented yet), but only once per user
	if context.Repo.ShowCallout(user.UserId, "welcome_2_0_message") {
		context.Repo.DismissCallout(user.UserId, "welcome_2_0_message")

		context.Send(tgbotapi.NewMessage(
			user.UserId,
			user.Locale().Get("main.welcome_link")))
	}
}

func HandleMessage(context *context.Context, userId int64, message *tgbotapi.Message) {
	log.Printf("Message: '%s'", message.Text)
	previousState := objects.Menu_Ban

	for isStateChanged(context, previousState, userId) == true {
		user := context.Repo.FindUser(userId)

		// Init user if it's not present
		if user == nil {
			user = &objects.User{
				UserId: userId,
				MenuId: objects.Menu_Init,
				ReportCnt: 0,
				ShadowBanned: false,
			}
		}

		// Save recent user information
		if message.From != nil  {

			user.Username = message.From.UserName
			user.FirstName = message.From.FirstName
			user.LastName = message.From.LastName
			user.LanguageCode = message.From.LanguageCode

			context.Repo.SaveUser(user)
		}

		oneTimeMessages(context, user)

		//fmt.Printf("%+v\n", message.Location)

		if message.Text == "/start" {
			user.MenuId = objects.Menu_Init
			message.Text = ""
			context.Repo.SaveUser(user)
		}

		if message.Text == "/cancel" {
			user.MenuId = objects.Menu_Feed
			message.Text = ""
			context.Repo.SaveUser(user)
		}

		fmt.Println(user.LanguageCode)

		previousState = user.MenuId
		var handler Handler

		switch user.MenuId {
		case objects.Menu_Init:
			handler = NewInitMenu()
		case objects.Menu_AskLocation:
			handler = NewAskLocationMenu()
		case objects.Menu_Feed:
			handler = NewFeedMenu()
		case objects.Menu_Post:
			handler = NewPostMenu()
		default:
			handler = nil
		}

		if handler != nil {
			handler.Handle(user, context, message)
		} else {
			log.Printf("Handler not implemented for menu with id %d\n", user.MenuId)
		}

		// Important! We need to redefine the message as indicator it has been processed.
		// Otherwise it can go into infinite loop.
		message = &tgbotapi.Message{}
	}
}