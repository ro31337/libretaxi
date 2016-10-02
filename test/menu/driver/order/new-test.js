/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import DriverOrderNew from '../../../../src/actions/menu/driver/order/new';
import { i18n } from '../../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new DriverOrderNew({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new DriverOrderNew({ i18n, user });
  const response = action.call();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '🔔 New order!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-index');
});
