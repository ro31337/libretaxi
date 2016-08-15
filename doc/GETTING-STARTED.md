# Getting started

You cloned repository already and you want to start. Okay, let's go together
through all the steps.

## Step 1. Environment

```bash
cp .env-sample .env
```

Command above will copy sample environment configuration to `.env`. It's required
to have your own `.env`.

In this file you'll see your pre-defined database connection. It should work,
but make sure you have your own credentials file outside this project and
your own url. Shared development environment is not a good thing.

At the moment there is no instructions on how to `./cheaptaxi-staging-credentials.json`
generate this file. It will be added later (or feel free to add one if you read this).

You don't need to configure Telegram tokens, because handlers are not implemented
at the moment.

## Step 2. Add changes to your `hosts` file.

Make sure `127.0.0.1 localhost.firebaseio.test` is specified in your `/etc/hosts`.
It's required for tests. Don't worry, if you won't specify this, `before-all` test
will fail.

See also:

* [Docs for firebase-server](https://github.com/urish/firebase-server/blob/master/README.md) -
package that we use to mock Firebase for local tests.

## Step 3. Install Redis.

Redis installation is covered in [REDIS.md](https://github.com/ro31337/cheaptaxi/blob/master/doc/REDIS.md). Nothing fancy here. `before-all` test
will fail if you did something wrong.

## You're good now!

When everything's done, it's time to test and run:

* `npm test` - Run tests. All tests should pass.
* `npm start` - Start application. At the moment it starts CLI interface only. Telegram
  handlers are not there, and we're working hard on adding them! Stay tuned.

## Still have issues?

Yes, I know we should use Docker, Vagrant or something else. If you feel enthusiastic
go ahead and add it! Explain in detail how to use it and create your own repo!
