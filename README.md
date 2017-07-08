<div>
<a href="https://travis-ci.org/ro31337/libretaxi/">
<img src="https://api.travis-ci.org/ro31337/libretaxi.svg?branch=master"></img>
</a>
</div>

PLEASE SCROLL DOWN IF YOU WANT TO SUPPORT LIBRETAXI

# LibreTaxi, open source alternative for Uber/Lyft

LibreTaxi makes taxis affordable again by completely removing all layers in between. Passengers pay with cash and get connected with drivers directly, where LibreTaxi is a thin layer allowing to negotiate the price before order is confirmed. No registration/approval is required. Less regulations.

* Available at [@libretaxi_bot](https://telegram.me/libretaxi_bot)
* Also see [LibreTaxi FAQ](doc/FAQ.md)

## Implementation details

Technical stack:

* Node.js, JavaScript (ES6)
* Firebase as data storage
* Redis as storage for [kue](https://github.com/Automattic/kue)
* [Telegram](https://telegram.org) as the main transport
* CLI as backup and PoC transport

Translatable via locale file. Currently has support of [20+ languages](src/validations/supported-locales.js).

Server support: macOS, Linux (Windows should also work).

Client (Telegram) support: iOS, Android, macOS desktop client, web (can also work for Windows phones - not tested). Note that Telegram desktop clients for Linux and Windows are currently not supported because of lack location functionality. However, web client can be used on these OS along with any modern browser.

## Why Telegram?

* Available for all popular platforms
* Contains rich bot API
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

## Linux tweaks

This package is using unicode emojis. [Click here](https://github.com/eosrei/emojione-color-font#install-on-ubuntu-linux) to install them. Unfortunately, on Linux they are in one color in Terminal and in Atom editor. Update this doc if you were able to make them in color in Terminal and/or Atom editor.

## Support LibreTaxi, this shit is important

LibreTaxi is technically challenging project. We have big plans, and we proved that we can make application that works. Thousands of engineers work for corporations like Uber, Lyft, etc, but currently we have no support and rely on YOU. We're on our way to finish paperwork for [501(c)(3)](https://en.wikipedia.org/wiki/501(c)(3)_organization) non-profit organization in California. It takes about 9 months to get tax-free status.

Right now we do a lot of work to push things forward, and little help can help a lot. Here is how you can help:

* Mobile devices. We're working on native mobile apps and if you can donate a device that works in U.S. or Russia - it would be great. It doesn't matter if it's new or used, but it should not be buggy please. It should work. Contact Roman by his email in [GitHub profile](https://github.com/ro31337) to donate.
* Computers. We need at least two more powerful Macbook Pros (1 per engineer) so we can work on iOS and Android app. PC laptops are also fine and will help. We need at least 4 big monitors so we can make our work more efficient. Contact Roman by his email in [GitHub profile](https://github.com/ro31337) to donate.
* Paypal donations. Send them to `romanpushkin@fastmail.com` (important). These donations are not tax-deductible at the moment. But we'll be happy to accept them. $5 seems not too much, but one cup of coffee can inspire founders work on the project full time for several days.
* Bitcoin: `1HoUX4UtYPZUUQekAmyYpr42Z9dV9kLke3`
* Ethereum: `0x01645791d038Ff07EcB95929448bd513D9C73cc4`
* LiteCoin: `LajxywwPMtL5P2s5oj7dGmcgmVhEc9R7gF`
