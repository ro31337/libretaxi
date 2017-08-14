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

/* eslint-disable no-new, no-console */
import test from 'ava';
import UpdateLocationResponseHandler from '../../src/response-handlers/update-location-response-handler'; // eslint-disable-line max-len
import UpdateLocationResponse from '../../src/responses/update-location-response';
import checkNotNullTest from '../helpers/check-not-null.js';
import User from '../../src/user';
import FirebaseServer from 'firebase-server';
import { overrideSettings } from '../../src/firebase-db';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5503',
  STATEFUL_CREDENTIALS_FILE: undefined,
});

let server = null;

test.before(() => {
  server = new FirebaseServer(5503, 'localhost.firebaseio.test', {
    users: {
      cli_1: { foo: 1, bar: 2 },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest(['response', 'user'], (args) => { new UpdateLocationResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new UpdateLocationResponseHandler({ response: {}, user: {} });
  t.pass();
});

test.cb('updates user object', t => {
  t.plan(6);

  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    t.falsy(user.state.l);
    t.falsy(user.state.locationUpdatedAt);

    const response = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
    const handler = new UpdateLocationResponseHandler({ response, user });

    handler.call(() => {
      t.truthy(user.state.l);
      t.is(user.state.locationUpdatedAt > 1473218180745, true); // 07 Sep 2016 03:16:20.745 GMT
      t.is(user.state.l[0], 37.421955);
      t.is(user.state.l[1], -122.084058);
      t.end();
    });
  });
});
//
test.cb('handles error while saving location', t => {
  const err = 'Sample error';

  // assert function, to be executed on `act`
  const assert = (actualMessage) => {
    const expectedMessage = `Error in UpdateLocationResponseHandler: ${err}`;
    t.is(actualMessage, expectedMessage);
    t.end();

    // cleanup
    console.log = tmp; // eslint-disable-line no-use-before-define
  };

  // arrange: replace `console.log` with `assert` function created above
  const tmp = console.log;
  console.log = assert;

  // arrange: create fake geoFire, it will replace `handler.geoFire`
  const fakeGeoFire = { set: () => new Promise((resolve, reject) => { reject(err); }) };

  // act: load user and execute handler with replaced `geoFire`
  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    const response = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
    const handler = new UpdateLocationResponseHandler({ response, user });
    handler.geoFire = fakeGeoFire;
    handler.call(() => {});
  });
});
