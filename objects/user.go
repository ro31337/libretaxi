package objects

import "github.com/leonelquinteros/gotext"

type MenuId int

const (
	Menu_Init        MenuId = 100
	Menu_AskLocation MenuId = 200
	Menu_Feed        MenuId = 300
	Menu_Post        MenuId = 400
	Menu_Ban 	     MenuId = 999999
)

type User struct {
	UserId int64
	MenuId MenuId
	Username string
	FirstName string
	LastName string
	Lon float64
	Lat float64
	LanguageCode string
	ReportCnt int
	ShadowBanned bool
	locale *gotext.Locale
}

func (u *User) Locale() *gotext.Locale {
	// TODO: init locale in one transaction
	if u.locale == nil {
		u.locale = gotext.NewLocale("./locales", "all")

		if u.LanguageCode == "ru" || u.LanguageCode == "es" || u.LanguageCode == "pt-pt" || u.LanguageCode == "pt-br" { // ... etc
			u.locale.AddDomain(u.LanguageCode)
		} else {
			u.locale.AddDomain("en")
		}
	}
	return u.locale
}