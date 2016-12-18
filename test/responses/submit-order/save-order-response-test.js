/* eslint-disable no-new */
import test from 'ava';
import SaveOrderResponse from '../../../src/responses/submit-order/save-order-response';
import checkNotNullTest from '../../helpers/check-not-null.js';

checkNotNullTest([
  'orderKey',
  'passengerKey',
  'passengerLocation',
  'passengerDestination',
  'price',
  'createdAt',
  'requestedVehicleType'],
  (args) => { new SaveOrderResponse(args); });

test('response can be constructed with default parameters', t => {
  new SaveOrderResponse({
    orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe',
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    price: 50,
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
    requestedVehicleType: 'car',
  });
  t.pass();
});

test('has response parameters accessible by `order` property', t => {
  const r = new SaveOrderResponse({
    orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe',
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    price: 50,
    createdAt: 123456,
    requestedVehicleType: 'car',
  });
  t.is(r.order.orderKey, '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe');
  t.is(r.order.passengerKey, 'cli_1');
  t.deepEqual(r.order.passengerLocation, [37.421955, -122.084058]);
  t.is(r.order.passengerDestination, 'South San Francisco BART station, CA, 94080');
  t.is(r.order.createdAt, 123456);
  t.is(r.order.requestedVehicleType, 'car');
  t.is(r.type, 'save-order');
});
