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
  const args = { distance: 10, from: [37.421955, -122.084058], to: 'foo', price: 50 };
  const action = new DriverOrderNew({ i18n, user });
  const response = action.call(args);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('driver-order-new.new_order'));
  t.is(response.responses[2].type, 'text');
  t.is(response.responses[2].message, i18n.__('driver-order-new.distance', '10.0 km'));
  t.is(response.responses[3].type, 'text');
  t.is(response.responses[3].message,
    i18n.__('driver-order-new.from', 'https://www.google.com/maps?q=37.421955,-122.084058'));
  t.is(response.responses[4].type, 'text');
  t.is(response.responses[4].message, i18n.__('driver-order-new.to', 'foo'));
  t.is(response.responses[5].type, 'text');
  t.is(response.responses[5].message, i18n.__('driver-order-new.price', 50));
  t.is(response.responses[6].type, 'text');
  t.is(response.responses[6].message, i18n.__('driver-order-new.call_to_action'));
  t.is(response.responses[7].type, 'redirect');
  t.is(response.responses[7].path, 'driver-index');
});
