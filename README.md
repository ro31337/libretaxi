<div>
<a href="https://travis-ci.org/ro31337/libretaxi/">
<img src="https://api.travis-ci.org/ro31337/libretaxi.svg?branch=master"></img>
</a>
</div>

Support project on Patreon: [https://www.patreon.com/libretaxi](https://www.patreon.com/libretaxi)

## LibreTaxi - ridesharing jailbreak (open source Uber alternative PoC)

LibreTaxi makes taxis affordable again by completely removing all layers in between. Passengers pay with cash and get connected with drivers directly, where LibreTaxi is a thin layer allowing to negotiate the price before order is confirmed. No registration/approval is required. Less regulations.

* Demo available at [@libretaxi_bot](https://telegram.me/libretaxi_bot)
* Also see [LibreTaxi FAQ](doc/FAQ.md)

## Implementation details

Technical stack:

* Node.js, JavaScript (ES6)
* [Firebase](https://firebase.google.com/) as data storage
* Redis as storage for [kue](https://github.com/Automattic/kue)
* [Telegram](https://telegram.org) as the main transport
* CLI as backup and PoC transport

Translatable via locale file. Currently has support of [20+ languages](src/validations/supported-locales.js).

Server support: macOS, Linux (Windows should also work).

Client (Telegram) support: iOS, Android, macOS desktop client, web (can also work for Windows phones - not tested). Note that Telegram desktop clients for Linux and Windows are currently not supported because of lack location functionality. However, web client can be used on these OS along with any modern browser.

## Why Telegram?

* Available for all popular platforms
* Has rich bot API
* Fast, reliable, and secure
* Works perfect with slow/poor Internet connection
* Staff and support are developer-friendly
* More likely to fight for LibreTaxi rights when it comes to regulations (Germany/EU jurisdiction)

## Technical roadmap (unordered)

* Make it safer for passengers and drivers
* Add Bitcoin integration
* Add drivers/passengers rating
* Add configuration based on zones and regions
* Add more vehicle types
* Make it easier to use and safer for moms/dads and children
* Make it easier to use for people with disabilities
* Add more translations
* Add integration (click) tests (and infrastructure) for Telegram platform
* Add delayed rides
* Refactoring, refactoring, refactoring

## Development guidelines

* [Installing Node.js](doc/NODEJS.md)
* [Getting started](doc/GETTING-STARTED.md)
* [Redis](doc/REDIS.md)
* [Esdoc](doc/ESDOC.md)
* [Contributing](doc/CONTRIBUTING.md)
* [Add translation](doc/TRANSLATE.md)
* [Debugging](doc/DEBUGGING.md)
* [Using Vagrant](doc/VAGRANT.md)

## Linux tweaks

This package is using unicode emojis. [Click here](https://github.com/eosrei/emojione-color-font#install-on-ubuntu-linux) to install them. Unfortunately, on Linux they are in one color in Terminal and in Atom editor. Update this doc if you were able to make them in color in Terminal and/or Atom editor.

## Support LibreTaxi

Here is how you can help:

* Support project on Patreon: [https://www.patreon.com/libretaxi](https://www.patreon.com/libretaxi)
* BTC: `1HoUX4UtYPZUUQekAmyYpr42Z9dV9kLke3`
* ETC: `0x01645791d038Ff07EcB95929448bd513D9C73cc4`
* LTC: `LajxywwPMtL5P2s5oj7dGmcgmVhEc9R7gF`
