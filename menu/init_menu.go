package menu

import (
	"fmt"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/context"
	"libretaxi/objects"
	"libretaxi/util"
	"log"
)

type InitMenuHandler struct {
	context *context.Context
	user *objects.User
}

func (handler *InitMenuHandler) postToPublicChannel() {
	// post to public channel once per user, so users can't spam it with /start command
	if !handler.context.Repo.ShowCallout(handler.user.UserId, "public_channel_callout_when_initialized") {
		return;
	}

	text := ""

	if len(handler.user.Username) == 0 {
		userTextContact := fmt.Sprintf("[%s %s](tg://user?id=%d)",
			util.EscapeMarkdown(handler.user.FirstName),
			util.EscapeMarkdown(handler.user.LastName),
			handler.user.UserId)
		text = fmt.Sprintf("%s has joined LibreTaxi", userTextContact)
	} else {
		text = fmt.Sprintf("@%s has joined LibreTaxi", handler.user.Username)
	}

	msg := tgbotapi.NewMessage(handler.context.Config.Public_Channel_Chat_Id, text)
	if len(handler.user.Username) == 0 {
		msg.ParseMode = "MarkdownV2"
	}
	handler.context.Send(msg)
	handler.context.Repo.DismissCallout(handler.user.UserId, "public_channel_callout_when_initialized")
}

func (handler *InitMenuHandler) Handle(user *objects.User, context *context.Context, message *tgbotapi.Message) {
	log.Println("Init menu")

	handler.context = context
	handler.user = user

	// Send welcome message
	msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("init_menu.welcome"))
	msg.DisableWebPagePreview = true
	context.Send(msg)

	user.MenuId = objects.Menu_AskLocation
	context.Repo.SaveUser(user)

	handler.postToPublicChannel();
}

func NewInitMenu() *InitMenuHandler {
	handler := &InitMenuHandler{}
	return handler
}
