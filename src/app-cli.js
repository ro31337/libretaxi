/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* eslint-disable no-console */
import './init';
import { loadUser } from './factories/user-factory';
import CliCaQueue from './queue/cli-ca-queue';
import callAction from './call-action';

if (process.argv.length !== 3) {
  console.log('Usage: npm start user_key');
  console.log('Example: npm start cli_1');
  process.exit();
}

const userKey = process.argv[2]; // instance user key
const queue = new CliCaQueue({ userKey });

loadUser(userKey).then((user) => {
  queue.create({ userKey, route: user.state.menuLocation || 'default' });
});

queue.process((job, done) => {
  const data = job.data;
  loadUser(data.userKey).then((user) => {
    callAction({
      user,
      arg: data.arg,
      route: data.route,
      queue,
    });
  })
  .catch((err) => console.log(err))
  .then(() => done());
});
