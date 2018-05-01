# Debugging

### Debugging a test

Debugging a test shouldn't be hard. Use [inspect-process](https://github.com/jaridmargolin/inspect-process) to easily launch a debugging session with Chrome DevTools.

```
$ npm install inspect-process -g
```

Modify `package.json` so your scripts -> ava entry will look like this:

```
    "ava": "TEST_ENVIRONMENT=true inspect node_modules/ava/profile.js --concurrency=5 --verbose --timeout=1000s --require babel-register",
```

(`cross-env` removed above, `inspect` command is used, we run `/ava/profile.js`, output set to verbose, timeout to 1000 seconds).

Set breakpoint(s) in your test(s), just use `debugger;` keyword inside the test.

Run the test with `npm run ava ./file/to/test.js`
