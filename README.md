# LibreTaxi v2

LibreTaxi is open-source Uber proof-of-concept that works through [Telegram](https://telegram.org/).

See it in action: https://t.me/libretaxi_bot

Public feed: https://t.me/libretaxi_all

It is closer to Craigslist rideshare rather than Uber, but it works, and works great! The app that is easy to use, supports multiple languages, fast and cool. There are tens of thousands users worldwide, and we're on the way to 1M users. So please spread the word!

* [How it works - English](https://telegra.ph/LibreTaxi-20---you-will-love-it-02-02)
* [How it works - Spanish](https://telegra.ph/LibreTaxi-20---te-va-a-enamorar-02-09)
* [How it works - Russian](https://telegra.ph/Novaya-versiya-Libre-taksi-vam-ponravitsya-02-08)
* [How it works - Portuguese](https://telegra.ph/LibreTaxi-20---Vai-o-amar-02-12)
* [How it works - Bengali](https://telegra.ph/LibreTaxi-20---%E0%A6%86%E0%A6%AA%E0%A6%A8-%E0%A6%8F%E0%A6%9F-%E0%A6%AD%E0%A6%B2%E0%A6%AC%E0%A6%B8%E0%A6%AC%E0%A6%A8-03-05)

## Prerequisites

1. [Install Go](https://golang.org/doc/install)
2. [Install Go dep](https://github.com/golang/dep)
3. Download the repo to `~/go/src/libretaxi`
4. Install Docker with docker-compose
5. Run PostgreSQL and RabbitMQ with default credentials (see connection strings below)
```
docker-compose up -d
```

## Setting up RabbitMQ (for development and production)

`rabbitmq:3-management` contains UI plugin for queue management. Plugin port is 8080 (15672 in container).
Login **guest/guest**.

Login to RabbitUI here: http://localhost:8080

There is only one queue at the moment:

* `messages` queue, http://localhost:8080/#/queues/%2F/messages - picked up by message handler, enqueued by libretaxi

Note that there is one message producer, and one message consumer threads (goroutines) in application.

Port 5672 is RabbitMQ itself.

## LibreTaxi settings

Init settings for `./libretaxi.yml`:

```
telegram_token: YOUR_TOKEN
db_conn_str: postgres://libretaxi:libretaxi@localhost:15432/libretaxi
rabbit_url: amqp://127.0.0.1:8079/
admin_channel_chat_id: -1001324105405
public_channel_chat_id: -1001470847849
```

Admin channel is the place where you shadow ban spamers. 
See https://stackoverflow.com/a/41779623/337085 for how to get id for you private channel.
You'll need to invite `@get_id_bot` and type `/my_id@get_id_bot`. You'll see chat id.

## Running

When all services are running, run libretaxi:

```
dep ensure # or ~/go/bin/dep ensure
go build
./libretaxi
```

## 🌟 Project Sponsors

Shown below are our bronze, silver and gold project sponsors.
Big thanks to these companies for supporting the project.
Note: Listed services are not tested, vetted nor supported by the author(s) in any manner.

### Gold sponsors

Prevent workplace conflicts with this Slack app:

<table><tbody><tr>
<td><a href="https://healthydebate.ai" target="_blank">
    <img width="400" src="https://user-images.githubusercontent.com/1477672/152650139-fe043eac-eab4-4cdb-a04a-e0a9daea4639.svg" alt="Prevent workplace conflicts">
</a></td>
</tr></tbody></table>

[Become a sponsor!](https://github.com/sponsors/ro31337)

[View all sponsors](https://github.com/sponsors/ro31337)
