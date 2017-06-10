# Getting started

You cloned repository already and you want to start. Okay, let's go together
through all the steps.

## Step 1. Environment

```bash
cp settings-sample.js settings.js
```

Command above will copy sample settings to settings. It's mandatory to have your own `settings.js`.

In this file you'll see your pre-defined database connection. It should work, but make sure you have your own credentials file.

## Step 2. Database connection and credentials

It's important to have `./libretaxi-development-credentials.json` before you can run the app.

We encourage you to have at least two files:

* `libretaxi-development-credentials.json` - credentials for development environment.
* `libretaxi-production-credentials.json` - credentials for production environment.

But for development purposes (and quick start) it's enough to have only first one (development).



Here is how to generate `libretaxi-development-credentials.json`:

* Go to [Firebase console](https://console.firebase.google.com/) and click "Create new project" (Note that Firebase and/or Firebase API is not available in some countries. For example, in Iran. You may need to use VPN).

* Type `libretaxi-development` as project name. Click "Create Project".

* Click on cog icon, select "Project settings", select "Service Accounts" tab. If it doesn't work, try [this url](https://console.firebase.google.com/project/libretaxi-development/settings/serviceaccounts/adminsdk).

* Click on "Generate private key". Download file as `libretaxi-development-credentials.json` and put it to project directory.

Keep in mind that credentials file is git-ignored. We do not recommend to add it to your git repository.

## Step 3. Indexes (recommended)

Also, make sure you have firebase indexes on `users.q`. If you don't have indexes, software will work anyway, but you may see the following warning:

> FIREBASE WARNING: Using an unspecified index. Consider adding ".indexOn": "g" at /users to your security rules for better performance

Here is how you can enable index. Add the following two lines into your `rules` section on [this page](https://console.firebase.google.com/project/libretaxi-development/database/rules):

```
    "users": {
      ".indexOn": "g"
    },
    "orders": {
      ".indexOn": "g"
    }
```

(`g` stands for "geofire" - library used to search by geo location).

So your configuration will look like this:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      ".indexOn": "g"
    },
    "orders": {
      ".indexOn": "g"
    }
  }
}
```

IMPORTANT! Do not miss comma (`,`) on line 4.

Click "Publish" button.

Screenshot:

![image](https://cloud.githubusercontent.com/assets/1477672/21249592/f4a27ee6-c2f3-11e6-9e03-c176d3092b63.png)


## Step 3. Telegram tokens

In Telegram app open dialog with `@botfather`:

![image](https://cloud.githubusercontent.com/assets/1477672/21249653/68e86f0e-c2f4-11e6-950b-862200013e5b.png)

Type `/newbot` command and follow instructions.

## Step 4. Get your Google Maps API key

Google Maps API key is required to lookup street addresses, if they're provided. For example, a
user can type street address and hit Enter, instead of clicking "Send location" button:

![image](https://cloud.githubusercontent.com/assets/1477672/25786160/d2bd17f2-3344-11e7-95fd-fca662cc8722.png)

In this case LibreTaxi tries to convert this address into coordinates and Google Maps geocoder is used.
Also, LibreTaxi can be configured to use other street address resolver (MapQuest, OpenCage, etc).
See [node-geocoder](https://github.com/nchaulet/node-geocoder) for details (you may want to skip
this link if you're configuring LibreTaxi for the first time).

To get your _Goolge Maps_ API key, go to [Developer's Guide here](https://developers.google.com/maps/documentation/geocoding/intro) and click "Get a key". Update
your `settings.js` with newly generated key (see `GEOCODING_API_KEY`);

## Step 5. Add changes to your `hosts` file.

(required for development, optional for production).

Make sure `127.0.0.1 localhost.firebaseio.test` is specified in your `/etc/hosts`.
It's required for tests. Don't worry, if you won't specify this, `before-all` test
will fail.

See also:

* [Docs for firebase-server](https://github.com/urish/firebase-server/blob/master/README.md) -
package that we use to mock Firebase for local tests.

## Step 6. Install Redis.

Redis installation is covered in [REDIS.md](REDIS.md). Nothing fancy here. `before-all` test
will fail if you did something wrong.

## You're good now!

When everything's done, it's time to test and run:

* `npm test` - Run tests. All tests should pass.
* `npm run telegram` - Start Telegram bot.
* `npm run build-production && npm run telegram-production` - Start Telegram bot for production.
* `npm run cli` - Start CLI version of the bot.
* `npm run tools:purge` - Purge stale orders, see [#528](https://github.com/ro31337/libretaxi/issues/528)

## Shutting down

It's recommended to shut down Telegram bot gracefully. With `pkill -f "node.*libretaxi"` command you should see the following output:

```
$ npm run telegram

> libretaxi@0.1.0 telegram /Users/ro/work/libretaxi
> babel-node ./src/app-telegram.js

OK telegram bot is waiting for messages...
Shutting down gracefully...
Kue shutdown: OK
```

## Still have issues?

I know we should use Docker, Vagrant or something else. If you feel enthusiastic go ahead and add it! Explain in detail how to use it and create a repo.
