/* eslint-disable no-new */
import test from 'ava';
import SaveOrderResponse from '../../../src/responses/submit-order/save-order-response';
import checkNotNullTest from '../../helpers/check-not-null.js';

checkNotNullTest([
  'passengerKey',
  'passengerLocation',
  'passengerDestination',
  'createdAt'],
  (args) => { new SaveOrderResponse(args); });

test('response can be constructed with default parameters', t => {
  new SaveOrderResponse({
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
  });
  t.pass();
});

test('has response parameters accessible by `order` property', t => {
  const r = new SaveOrderResponse({
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    createdAt: 123456,
  });
  t.is(r.order.passengerKey, 'cli_1');
  t.deepEqual(r.order.passengerLocation, [37.421955, -122.084058]);
  t.is(r.order.passengerDestination, 'South San Francisco BART station, CA, 94080');
  t.is(r.order.createdAt, 123456);
  t.is(r.type, 'save-order');
});
