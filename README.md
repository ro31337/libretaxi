Cheap Taxi
==========

Cheap Taxi, Telegram Bot ([@cheaptaxi_bot](https://telegram.me/goa_bot))

Install & Configure
===================

```
npm i
cp .env-sample .env
```

Update your `.env` file:

`TELEGRAM_TOKEN` - obtain your token
[here](https://core.telegram.org/bots#botfather). Token should look like this:

```
177081234:AbcdeE3879823SKjwhk2934
```


`STATEFUL_CONNSTR` - connection string for Firebase for stateful objects.
Example:

```
https://state-test.firebaseio.com/
```

Run
===

```
npm start
```

Documentation
=============

Command below will generate documentation based on comments from source code:

```
npm run esdoc
```
