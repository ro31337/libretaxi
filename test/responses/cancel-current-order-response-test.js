/* eslint-disable no-new */
import test from 'ava';
import CancelCurrentOrderResponse from '../../src/responses/cancel-current-order-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('passengerKey', (args) => { new CancelCurrentOrderResponse(args); });

test('can be constructed with default parameters', t => {
  new CancelCurrentOrderResponse({ passengerKey: 'telegram_31337' });
  t.pass();
});

test('should save properties and have \'user-state\' type', t => {
  const r = new CancelCurrentOrderResponse({ passengerKey: 'telegram_31337' });
  t.is(r.type, 'cancel-current-order');
  t.is(r.passengerKey, 'telegram_31337');
});
