/* eslint-disable no-new */
import test from 'ava';
import CancelCurrentOrderResponse from '../../src/responses/cancel-current-order-response';

test('can be constructed with default parameters', t => {
  new CancelCurrentOrderResponse();
  t.pass();
});

test('should have type', t => {
  const r = new CancelCurrentOrderResponse();
  t.is(r.type, 'cancel-current-order');
});
