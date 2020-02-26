package context

import (
	"github.com/go-telegram-bot-api/telegram-bot-api"
	"libretaxi/config"
	"libretaxi/rabbit"
	"libretaxi/repository"
)

type Context struct {
	Bot  *tgbotapi.BotAPI
	Repo *repository.Repository
	RabbitPublish *rabbit.RabbitClient // for publishing only
	RabbitConsume *rabbit.RabbitClient // for consuming only
	Config *config.Config
}

// drop-in replacement for telegram Send method, posts with highest priority
func (context * Context) Send(message tgbotapi.MessageConfig) {
	context.RabbitPublish.PublishTgMessage(rabbit.MessageBag{
		Message: message,
		Priority: 255, // highest priority, lowest is 0
	})
}
