# Redis

Redis is required by [kue](https://github.com/Automattic/kue). Version requirements:

* Redis >= 2.6.12

## Installing on Linux

```bash
sudo apt-get install redis-server
```

## Installing on Mac

TODO

## Things to note

By default, Kue will connect to Redis using the client default settings (port
defaults to `6379`, host defaults to `127.0.0.1`, prefix defaults to `q`).

In this project we don't specify redis connection string in our `settings.js` file.  It would be nice to have DB `0` for development/production and DB `1` for tests.

`before-all.js` test tries to check if compatible version of Redis is installed,
and if it's available. Redis is required to run tests.

See also:

* [Kue, redis connection strings](https://github.com/Automattic/kue#redis-connection-settings)

## Check installation

`redis-cli` tool should be installed with `redis-server` package. Check if redis
up and running with the following command: `redis-cli ping`. It should respond
with `PONG`.

If something goes wrong, try:

```bash
sudo service redis-server restart
```

## Basic Redis commands

In most cases you don't need to think about it, but here are few commands that
can be useful while debugging:

* `redis-cli` - runs Redis command-line interface. You'll execute other commands
  from here. When you run CLI you're switched to DB `0` by default.
* `info keyspace` - show databases and stats.
* `set aa bb` - sets the value of key `aa` to `bb`
* `get aa` - gets the value of key `aa`
* `select 1` - selects database `1`
* `keys *` - shows all keys
* `flushall` - clear all keys in *all* databases
* `^flushdb` - clear keys in current database
