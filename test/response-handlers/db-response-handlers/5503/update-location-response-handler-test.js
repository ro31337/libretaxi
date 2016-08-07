/* eslint-disable no-new, no-console */
import test from 'ava';
import UpdateLocationResponseHandler from '../../../../src/response-handlers/update-location-response-handler'; // eslint-disable-line max-len
import UpdateLocationResponse from '../../../../src/responses/update-location-response';
import checkNotNullTest from '../../../helpers/check-not-null.js';
import User from '../../../../src/user';
import FirebaseServer from 'firebase-server';

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
  t.plan(4);

  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    t.falsy(user.state.l);

    const response = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
    const handler = new UpdateLocationResponseHandler({ response, user });

    handler.call(() => {
      t.truthy(user.state.l);
      t.is(user.state.l[0], 37.421955);
      t.is(user.state.l[1], -122.084058);
      t.end();
    });
  });
});

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
