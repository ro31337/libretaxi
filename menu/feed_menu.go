package menu

import (
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/context"
	"libretaxi/objects"
	"log"
)

type FeedMenuHandler struct {
}

func getKeyboard(user *objects.User) tgbotapi.ReplyKeyboardMarkup {
	keyboard := tgbotapi.NewReplyKeyboard(
		tgbotapi.NewKeyboardButtonRow(
			tgbotapi.NewKeyboardButton(user.Locale().Get("feed_menu.search_button")),
			tgbotapi.NewKeyboardButtonLocation(user.Locale().Get("feed_menu.location_button")),
		),
	)
	keyboard.OneTimeKeyboard = true
	return keyboard
}

func (handler *FeedMenuHandler) Handle(user *objects.User, context *context.Context, message *tgbotapi.Message) {
	log.Println("Feed menu")

	if len(message.Text) == 0 && message.Location == nil {

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("feed_menu.greeting"))
		msg.ReplyMarkup = getKeyboard(user)

		context.Send(msg)

	} else if message.Text == user.Locale().Get("feed_menu.search_button") {

		user.MenuId = objects.Menu_Post
		context.Repo.SaveUser(user)

	} else if message.Location != nil {

		user.Lon = message.Location.Longitude
		user.Lat = message.Location.Latitude
		context.Repo.SaveUser(user)

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("feed_menu.location_changed"))
		msg.ReplyMarkup = getKeyboard(user)
		context.Send(msg)

	} else {

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("feed_menu.error"))
		msg.ReplyMarkup = getKeyboard(user)
		context.Send(msg)

	}

	//user.MenuId = objects.Menu_AskLocation
	//context.Repo.SaveUser(user)
}

func NewFeedMenu() *FeedMenuHandler {
	handler := &FeedMenuHandler{}
	return handler
}
