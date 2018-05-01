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

/* eslint-disable no-new, no-console, no-unused-vars */
import test from 'ava';
import SaveOrderResponseHandler from '../../../src/response-handlers/submit-order/save-order-response-handler'; // eslint-disable-line max-len
import SaveOrderResponse from '../../../src/responses/submit-order/save-order-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import FirebaseServer from 'firebase-server';
import firebaseDB, { overrideSettings } from '../../../src/firebase-db';
import { ss } from '../../spec-support';
import sinon from 'sinon';
import User from '../../../src/user';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5504',
});

let server = null;
const response = new SaveOrderResponse({
  orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe',
  passengerKey: 'cli_1',
  passengerLocation: [37.421955, -122.084058],
  passengerDestination: 'South San Francisco BART station, CA, 94080',
  price: 50,
  createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
  requestedVehicleType: 'motorbike',
});

test.before(() => {
  server = new FirebaseServer(5504, 'localhost.firebaseio.test', {}); // empty db
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest('response', (args) => { new SaveOrderResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new SaveOrderResponseHandler({ response: {} });
  t.pass();
});

test.cb('should create order and inform passenger when called', t => {
  t.plan(12);
  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    const assert = () => {
      const db = firebaseDB.config().ref('orders');
      db.on('value', (snapshot) => {
        const obj = snapshot.val();

        /* Database should look like this:

        { '27455828-d309-4370-bb10-6674d9d467f9':
           { createdAt: 1471578557107,
             g: '9q9hvumneq',
             l: [ 37.421955, -122.084058 ],
             passengerDestination: 'South San Francisco BART station, CA, 94080',
             passengerKey: 'cli_1',
             passengerLocation: [ 37.421955, -122.084058 ] } }

        Only one key-value pair. So we just need to get the first value.
        */

        t.is(Object.keys(obj).length, 1); // there should be 1 record
        const firstKey = Object.keys(obj)[0]; // first key (guid)
        const v = obj[firstKey]; // get the value (order properties)

        t.is(firstKey, '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe');
        t.truthy(v.g); // geoFire metadata should be truthy
        t.deepEqual(v.l, [37.421955, -122.084058]); // geoFire location
        t.deepEqual(v.passengerLocation, [37.421955, -122.084058]);
        t.is(v.passengerKey, 'cli_1');
        t.is(v.passengerDestination, 'South San Francisco BART station, CA, 94080');
        t.is(v.status, 'new');
        t.is(v.requestedVehicleType, 'motorbike');
        t.is(v.price, 50);
        t.truthy(v.createdAt);
        t.is(user.state.currentOrderKey, firstKey);
        t.end();
      });
    };

    const handler = new SaveOrderResponseHandler({ response, user });
    handler.call(assert);
  });
});

test.cb('handles error while saving location', t => {
  const err = 'Sample error';

  // assert function, to be executed on `act`
  const assert = (actualMessage) => {
    const expectedMessage = `Error in SaveOrderResponseHandler (geoFire): ${err}`;
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

  // act
  const handler = new SaveOrderResponseHandler({ response });
  handler.geoFire = fakeGeoFire;
  handler.call(() => {});
});
