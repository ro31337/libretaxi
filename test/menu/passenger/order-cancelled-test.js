/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import OrderCancelled from '../../../src/actions/menu/passenger/order-cancelled';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new OrderCancelled({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new OrderCancelled({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('order-cancelled.order_cancelled'));
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'passenger-index');
});
