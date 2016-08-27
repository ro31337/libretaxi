/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import OrderSubmitted from '../../../src/actions/menu/passenger/order-submitted';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new OrderSubmitted({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new OrderSubmitted({ i18n, user });
  const response = action.call();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('order-submitted.order_submitted'));
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'foo');
});
