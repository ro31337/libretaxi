package menu

import (
	"fmt"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/context"
	"libretaxi/objects"
	"libretaxi/rabbit"
	"libretaxi/util"
	"libretaxi/validation"
	"log"
	"math/rand"
	"strings"
)

type PostMenuHandler struct {
	user    *objects.User
	context *context.Context
}

func (handler *PostMenuHandler) postToAdminChannel(text string) {
	msg := tgbotapi.NewMessage(handler.context.Config.Admin_Channel_Chat_Id, text)
	if len(handler.user.Username) == 0 {
		msg.ParseMode = "MarkdownV2"
	}
	banKeyboard := tgbotapi.NewInlineKeyboardMarkup(
		tgbotapi.NewInlineKeyboardRow(
			tgbotapi.NewInlineKeyboardButtonData("☝️ Shadow ban", fmt.Sprintf("{\"Action\":\"SHADOW_BAN\",\"Id\":%d}", handler.user.UserId)),
		),
	)
	msg.ReplyMarkup = banKeyboard

	handler.context.Send(msg)
}

func (handler *PostMenuHandler) postToPublicChannel(text string) {
	// TODO fix line below: Error sending Telegram message: Bad Request: can't parse entities: Can't find end of Italic entity at byte offset 148
	// msg := tgbotapi.NewMessage(handler.context.Config.Public_Channel_Chat_Id, text + "\nVia 👉 @libretaxi_bot")
	msg := tgbotapi.NewMessage(handler.context.Config.Public_Channel_Chat_Id, text)
	if len(handler.user.Username) == 0 {
		msg.ParseMode = "MarkdownV2"
	}
	handler.context.Send(msg)
}

func (handler *PostMenuHandler) informUsersAround(lon float64, lat float64, text string, postId int64, user *objects.User) {
	textWithContacts := ""
	via := user.Locale().Get("post_menu.via")

	if len(handler.user.Username) == 0 { // use markdown
		userTextContact := fmt.Sprintf("[%s %s](tg://user?id=%d)",
			util.EscapeMarkdown(handler.user.FirstName),
			util.EscapeMarkdown(handler.user.LastName),
			handler.user.UserId)
		textWithContacts = fmt.Sprintf("%s\n\n%s %s",
			util.EscapeMarkdown(text),
			util.EscapeMarkdown(via),
			userTextContact)
	} else {
		textWithContacts = fmt.Sprintf("%s\n\n%s @%s", text, via, handler.user.Username)
	}

	// Post to the admin channel first, do not bother in case of shadow ban
	if !handler.user.ShadowBanned {
		handler.postToAdminChannel(textWithContacts)
		handler.postToPublicChannel(textWithContacts)
	}

	// In case of shadow ban, post to current user only and return
	if handler.user.ShadowBanned {
		msg := tgbotapi.NewMessage(handler.user.UserId, textWithContacts)

		if len(handler.user.Username) == 0 {
			msg.ParseMode = "MarkdownV2"
		}

		handler.context.RabbitPublish.PublishTgMessage(rabbit.MessageBag{
			Message:  msg,
			PostId:   postId,
			Priority: 0, // lowest priority for shadow banned :-P TODO: make it everywhere
		})
		return
	}

	// Post to users around
	userIds := handler.context.Repo.UserIdsAround(lon, lat)

	for i, _ := range userIds {
		userId := userIds[i]
		msg := tgbotapi.NewMessage(userId, textWithContacts)

		if len(handler.user.Username) == 0 {
			// IMPORTANT!
			// Currently markdown not escaped. It means when a user sends, for example "Looking for passenger(s)",
			// Telegram will NOT accept this request, it will fail with
			// Bad Request: can't parse entities: Character '(' is reserved and must be escaped with the preceding '\'
			// TODO: always escape markdown (user input)
			msg.ParseMode = "MarkdownV2"
		}

		reportKeyboard := tgbotapi.NewInlineKeyboardMarkup(
			tgbotapi.NewInlineKeyboardRow(
				tgbotapi.NewInlineKeyboardButtonData(user.Locale().Get("post_menu.report_button"),
					fmt.Sprintf("{\"Action\":\"REPORT_POST\",\"Id\":%d}", postId)),
			),
		)
		msg.ReplyMarkup = reportKeyboard

		// Mass-send with lower priority (lower than 100, more than 1).
		// Random priority below is to ensure the normal distrubution of messages between multiple users at the same point of time.
		handler.context.RabbitPublish.PublishTgMessage(rabbit.MessageBag{
			Message:  msg,
			PostId:   postId,
			Priority: uint8(rand.Intn(99) + 1), // random priority 1..100
		})
	}
}

func (handler *PostMenuHandler) Handle(user *objects.User, context *context.Context, message *tgbotapi.Message) {
	log.Println("Post menu")

	handler.user = user
	handler.context = context

	if context.Repo.UserPostedRecently(user.UserId) {

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("post_menu.wait"))
		context.Send(msg)

		user.MenuId = objects.Menu_Feed
		context.Repo.SaveUser(user)

	} else if len(message.Text) == 0 {

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("post_menu.copy_and_paste"))
		context.Send(msg)

		// IMPORTANT! Do not use Markdown'ish symbols here, like (, ), [, ]... because when user copies and pastes the
		// message below, when username isn't set up, "informUsersAround" method above will turn message into
		// markdown. If these symbols are present, it will mix up the entire message (probably won't be accepted by Telegram)

		msg = tgbotapi.NewMessage(user.UserId, user.Locale().Get("post_menu.driver_example"))
		context.Send(msg)

		msg = tgbotapi.NewMessage(user.UserId, user.Locale().Get("post_menu.passenger_example"))
		context.Send(msg)
	} else {

		textValidation := validation.NewTextValidation()
		error := textValidation.Validate(message.Text, user.Locale())

		if len(error) > 0 {
			msg := tgbotapi.NewMessage(user.UserId, error + " " + user.Locale().Get("post_menu.or") + " /cancel")

			context.Send(msg)
			return
		}

		cleanText := strings.TrimSpace(message.Text)

		post := &objects.Post{
			UserId:    user.UserId,
			Text:      cleanText,
			Lon:       user.Lon,
			Lat:       user.Lat,
			ReportCnt: 0,
		}

		context.Repo.SavePost(post)

		go handler.informUsersAround(post.Lon, post.Lat, cleanText, post.PostId, user)

		msg := tgbotapi.NewMessage(user.UserId, user.Locale().Get("post_menu.sent"))
		context.Send(msg)

		user.MenuId = objects.Menu_Feed
		context.Repo.SaveUser(user)
	}
}

func NewPostMenu() *PostMenuHandler {
	handler := &PostMenuHandler{}
	return handler
}
