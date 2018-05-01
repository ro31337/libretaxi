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

/* eslint-disable no-new */
import test from 'ava';
import UserStateResponseHandler from '../../src/response-handlers/user-state-response-handler'; // eslint-disable-line max-len
import UserStateResponse from '../../src/responses/user-state-response';
import checkNotNullTest from '../helpers/check-not-null.js';
import User from '../../src/user';
import FirebaseServer from 'firebase-server';
import { overrideSettings } from '../../src/firebase-db';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5502',
});

let server = null;

test.before(() => {
  server = new FirebaseServer(5502, 'localhost.firebaseio.test', {
    users: {
      cli_1: { foo: 1, bar: 2 },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest(['response', 'user'], (args) => { new UserStateResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new UserStateResponseHandler({ response: {}, user: {} });
  t.pass();
});

test.cb('updates user object', t => {
  t.plan(4);

  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    t.is(user.state.foo, 1);
    t.is(user.state.bar, 2);

    const response = new UserStateResponse({ foo: 123 });
    const handler = new UserStateResponseHandler({ response, user });

    handler.call(() => {
      t.is(user.state.foo, 123);
      t.is(user.state.bar, 2);
      t.end();
    });
  });
});
