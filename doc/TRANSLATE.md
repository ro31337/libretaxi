# Translate LibreTaxi

Thanks for your help translating LibreTaxi to other languages. Here is prioritized list of languages we want LibreTaxi translate to:

* Hindi - bot was translated, but [we need your help here](https://github.com/ro31337/libretaxi-www/issues/35)
* Tamil - bot was translated, but [we need your help here](https://github.com/ro31337/libretaxi-www/issues/36)
* Your language! Please [check](../src/validations/supported-locales.js) if translation already exists. Thank you!

## How to translate

Translating LibreTaxi is extremely easy. You just need to understand English and be fluent in the language you're translating to. We're on the way to deliver the app to simplify it even more, but for now you just need to translate json file.

## Step 0.

Please go to [PRs list](https://github.com/ro31337/libretaxi/pulls) and lookup your language. If translation is there, no translation is required - all translations will be merged soon. **But we still need your help!** Check "Ready for more?" section below.

## Step 1.

Grab [the latest version of json-file with English](../locales/en.json). Cut and paste this file to your text editor. If you familiar with git and GitHub, just fork LibreTaxi and do all the work here and on the next steps in your repo.

## Step 2.

Translate all the keys **without** `_desc` suffix. Basically, we use keys with `_desc` suffix to give you a context of what this key means. For example:

```
"select-user-type.who_you_are": "Who you are? (select for now, you can change it later)",
"select-user-type.who_you_are_desc": "At the very beginning user must select type, so we're asking if the user is taxi driver or passenger",
```

`Who you are? (select for now, you can change it later)` text above is what you need to translate. And `At the very beginning user must select type, so we're asking if the user is taxi driver or passenger` is explanation for translator, like you. So you'll better understand the context of this phrase.

You don't need explanation in result json-file. Check out [how Russian translation looks like](../locales/ru.json). Also, if you don't know how something, feel free to refer to Russian translation and see how things work there.

Also, don't translate key name itself :) You don't need to translate `select-user-type.who_you_are`, translate value only.

## Step 3.

Contribute! If you know how git and GitHub works, just create pull request. If you submit translation, you don't need to run tests, update code base, etc. Just submit translation file and LibreTaxi team will do the rest for you.

If you don't know how git and GitHub works, just upload your file to [gist.github.com](http://gist.github.com) or [paste2](https://paste2.org/). Send a link to LibreTaxi collaborators' email (for example, to `roman.pushkin/at/gmail.com`).

## You're done!

Thanks for translating LibreTaxi and making this project more awesome for people around the world!

## Ready for more?

Nice to hear that! Translating the bot itself is the most important thing, so thanks for that! But there is also website itself - http://libretaxi.org. It's nothing more than a landing page explaining project philosophy and how it works. Can be also useful for people speaking your language. 

Repository for the website is here: https://github.com/ro31337/libretaxi-www. If you feel enthusiastic, please help translating the website into your language. You just need to translate `index.html`, and commit it (or send translated page by email at roman.pushkin/at/gmail). If you want more, you can make two screenshots: one for driver, and one for passenger. [Check out](http://libretaxi.org/index-pt.html) how Portuguese screenshots look like. Pretty cool, huh?
