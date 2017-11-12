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
import RedirectResponseHandler from '../../src/response-handlers/redirect-response-handler';
import RedirectResponse from '../../src/responses/redirect-response';
import checkNotNullTest from '../helpers/check-not-null.js';
import User from '../../src/user';
import FirebaseServer from 'firebase-server';
import { overrideSettings } from '../../src/firebase-db';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5501',
});

let server = null;

test.before(() => {
  server = new FirebaseServer(5501, 'localhost.firebaseio.test', {
    users: {
      cli_2: { menuLocation: 'something' },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest(['response', 'user'], (args) => { new RedirectResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new RedirectResponseHandler({ response: {}, user: {} });
  t.pass();
});

test.cb('updates user object', t => {
  t.plan(2);

  new User({ platformType: 'cli', platformId: 2 }).load().then((user) => {
    t.is(user.state.menuLocation, 'something');

    const response = new RedirectResponse({ path: 'default' });
    const handler = new RedirectResponseHandler({ response, user });

    handler.call(() => {
      t.is(user.state.menuLocation, 'default');
      t.end();
    });
  });
});
