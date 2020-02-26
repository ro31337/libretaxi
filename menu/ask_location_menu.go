package menu

import (
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/context"
	"libretaxi/objects"
	"log"
)

type AskLocationMenuHandler struct {
	user *objects.User
	context *context.Context
	message *tgbotapi.Message
}

func (handler *AskLocationMenuHandler) saveLocation() {
	handler.user.Lon = handler.message.Location.Longitude
	handler.user.Lat = handler.message.Location.Latitude
	handler.context.Repo.SaveUser(handler.user)
}

func (handler *AskLocationMenuHandler) Handle(user *objects.User, context *context.Context, message *tgbotapi.Message) {
	log.Println("Ask location menu")

	handler.user = user
	handler.context = context
	handler.message = message

	if message.Location != nil {
		log.Printf("Saving location: %+v\n", message.Location)
		handler.saveLocation()

		// update state
		user.MenuId = objects.Menu_Feed
		context.Repo.SaveUser(user)
		return
	} else {
		var buttons = []tgbotapi.KeyboardButton{
			tgbotapi.NewKeyboardButtonLocation(user.Locale().Get("ask_location_menu.next_button")),
		}

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("ask_location_menu.click_next"))
		msg.ReplyMarkup = tgbotapi.NewReplyKeyboard(buttons)

		context.Send(msg)
	}
}

func NewAskLocationMenu() *AskLocationMenuHandler {
	handler := &AskLocationMenuHandler{}
	return handler
}
