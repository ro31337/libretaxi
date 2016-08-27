/* eslint-disable no-new, no-console */
import test from 'ava';
import SubmitOrderResponseHandler from '../../../../src/response-handlers/submit-order-response-handler'; // eslint-disable-line max-len
import SubmitOrderResponse from '../../../../src/responses/submit-order-response';
import checkNotNullTest from '../../../helpers/check-not-null.js';
import FirebaseServer from 'firebase-server';
import firebaseDB from '../../../../src/firebase-db';
import { ss } from '../../../spec-support';
import sinon from 'sinon';

let server = null;
const response = new SubmitOrderResponse({
  passengerKey: 'cli_1',
  passengerLocation: [37.421955, -122.084058],
  passengerDestination: 'South San Francisco BART station, CA, 94080',
  createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
});

test.before(() => {
  server = new FirebaseServer(5504, 'localhost.firebaseio.test', {}); // empty db
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest('response', (args) => { new SubmitOrderResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new SubmitOrderResponseHandler({ response: {} });
  t.pass();
});

test.cb('should create order and inform passenger when called', t => {
  t.plan(9);
  const informPassengerSpy = ss.sinon.spy();

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

      t.truthy(v.g); // geoFire metadata should be truthy
      t.deepEqual(v.l, [37.421955, -122.084058]); // geoFire location
      t.deepEqual(v.passengerLocation, [37.421955, -122.084058]);
      t.is(v.passengerKey, 'cli_1');
      t.is(v.passengerDestination, 'South San Francisco BART station, CA, 94080');
      t.is(v.status, 'new');
      t.truthy(v.createdAt);
      t.truthy(informPassengerSpy.calledWith('cli_1'));
      t.end();
    });
  };

  const handler = new SubmitOrderResponseHandler({ response });
  handler.informPassenger = informPassengerSpy;
  handler.call(assert);
});

test.cb('handles error while saving location', t => {
  const err = 'Sample error';

  // assert function, to be executed on `act`
  const assert = (actualMessage) => {
    const expectedMessage = `Error in SubmitOrderResponseHandler (geoFire): ${err}`;
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
  const handler = new SubmitOrderResponseHandler({ response });
  handler.geoFire = fakeGeoFire;
  handler.call(() => {});
});

test('should post message to the queue when informing passenger', t => {
  // arrange
  const queue = {};
  const create = ss.sinon.stub().returns(queue);
  const delay = ss.sinon.stub().returns(queue);
  const priority = ss.sinon.stub().returns(queue);
  const save = ss.sinon.stub().returns(queue);
  Object.assign(queue, { create, delay, priority, save });

  // act
  const handler = new SubmitOrderResponseHandler({ response: {}, queue });
  handler.informPassenger('cli_1');

  // assert
  t.truthy(create
    .calledWith('call-action', { userKey: 'cli_1', route: 'order-submitted' }));
  t.truthy(delay.calledWith(1000));
  t.truthy(priority.calledWith('high'));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, delay, priority, save);
  t.pass();
});
