package callback

import (
	"encoding/json"
	"libretaxi/context"
	"log"
)

type TgCallbackHandler struct {
}

type ActionData struct {
	Action string
	Id int64
}

func(callbackHandler *TgCallbackHandler) Handle(context *context.Context, jsonString string) {
	var actionData ActionData
	json.Unmarshal([]byte(jsonString), &actionData)

	log.Printf("Action: %s, Id: %d\n", actionData.Action, actionData.Id)

	switch actionData.Action {
	case "REPORT_POST":
		post := context.Repo.FindPost(actionData.Id)
		post.ReportCnt++
		context.Repo.SavePost(post)
	case "SHADOW_BAN":
		user := context.Repo.FindUser(actionData.Id)
		user.ShadowBanned = true
		context.Repo.SaveUser(user)
	}
}

func NewTgCallbackHandler() (callbackHandler *TgCallbackHandler) {
	ch := &TgCallbackHandler{}
	return ch
}