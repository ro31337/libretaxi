package validation

import (
	"fmt"
	"github.com/leonelquinteros/gotext"
	"regexp"
	"strings"
)

type TextValidation struct {
	emptyCnt uint32
	totalCnt uint32
}

func(validation *TextValidation) Validate(text string, locale *gotext.Locale) (error string) {
	if len(text) > 300 {
		return fmt.Sprintf(locale.Get("validation.text_too_long"), len(text))
	}

	if len(text) < 20 {
		return fmt.Sprintf(locale.Get("validation.text_too_short"), len(text))
	}

	if !strings.HasPrefix(text, "🚗") && !strings.HasPrefix(text, "👋") && !strings.HasPrefix(text, "🚘") {
		return locale.Get("validation.prefix")
	}

	if strings.Contains(text, "@") {
		return locale.Get("validation.no_at")
	}

	lowerText := strings.ToLower(text)

	if strings.Contains(lowerText, "fuck") || strings.Contains(lowerText, "хуй") || strings.Contains(lowerText, "пизда") || strings.Contains(lowerText, "блядь") {
		return locale.Get("validation.no_offensive_language")
	}

	if strings.Contains(lowerText, locale.Get("validation.dummy_addr_lowercase")) {
		return locale.Get("validation.change_from_to")
	}

	if strings.Contains(lowerText, "http") || strings.Contains(lowerText, "ftp://") || strings.Contains(lowerText,"www") {
		return "🚫 No links please"
	}

	var re = regexp.MustCompile(`\w\.[a-z]{2,5}`)

	if len(re.FindAllString(lowerText, -1)) > 0 {
		return "🚫 No domains please"
	}

	lines := strings.Split(text, "\n")

	for i := range lines {
		line := strings.TrimSpace(lines[i])

		if len(line) == 0 {
			validation.emptyCnt++
		} else {
			validation.totalCnt++
		}
	}

	if validation.emptyCnt > 2 {
		return fmt.Sprintf(locale.Get("validation.empty_lines1"), validation.emptyCnt)
	}

	if validation.totalCnt > 9 {
		return fmt.Sprintf(locale.Get("validation.empty_lines2"), validation.totalCnt)
	}

	if validation.totalCnt < 5 {
		return fmt.Sprintf(locale.Get("validation.min_lines"), validation.totalCnt)
	}

	return ""
}

func NewTextValidation() (textValidation *TextValidation) {
	validation := &TextValidation{}
	return validation
}