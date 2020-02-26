package util

import "strings"

// Escape markdown characters:
// _ * [ ] ( ) ~ > # + - = | { } . !
func EscapeMarkdown(str string) string {
	var replacer = strings.NewReplacer("_", "\\_", "*", "\\*", "[", "\\[", "]", "\\]",
		"(", "\\(", ")", "\\)", "~", "\\~", ">", "\\>", "#", "\\#", "+", "\\+", "-",
		"\\-", "=", "\\=", "|", "\\|", "{", "\\{", "}", "\\}", ".", "\\.", "!", "\\!")
	return replacer.Replace(str)
}
