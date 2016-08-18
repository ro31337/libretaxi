# Node.js

This project requires Node.js to be installed. It still uses Babel in those
places where ES6 is [still not supported](http://node.green/).

## Install Node.js

Before you start, install the right version of Node.js. See [.node-version](../.node-version).

The best way to install Node.js is to install [Node Version Manager](https://github.com/creationix/nvm#install-script) first. Basic commands are:

* `nvm ls` - show the list of locally installed Node.js versions.
* `nvm ls-remote` - show the list of available remote Node.js versions.
* `nvm install v6.3.1` - installs Node.js version 6.3.1
* `nvm --help` - for the list of other commands.

When you typed `nvm install v6.3.1` (or other version) make sure Node.js works by typing:

* `node -v` - show version of Node
* `npm -v` - show version of Node Package Manager (this is NOT `nvm`!)

Now you're good to run  `npm i` from cloned project directory to install dependencies. `master` branch should be up to date and you can type `npm test` (see "Tests" section below) and `npm start` right after `npm i`.
