/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import DriverOrderNew from '../../../../src/actions/menu/driver/order/new';
import { i18n, ss } from '../../../spec-support';

const user = { userKey: 'cli_1', state: { phone: '(555) 123-11-22' } };

test('can be constructed with default parameters', t => {
  new DriverOrderNew({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const args = { distance: 10, from: [37.421955, -122.084058], to: 'foo', price: '50',
    passengerKey: 'cli_2', orderKey: 'd3adb33f' };
  const action = new DriverOrderNew({ i18n, user });
  const response = action.call(args);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'user-state');
  t.is(response.responses[2].type, 'text');
  t.is(response.responses[2].message, i18n.__('driver-order-new.new_order'));
  t.is(response.responses[3].type, 'text');
  t.is(response.responses[3].message, i18n.__('driver-order-new.distance', '10.0 km'));
  t.is(response.responses[4].type, 'map');
  t.deepEqual(response.responses[4].location, [37.421955, -122.084058]);
  t.is(response.responses[5].type, 'text');
  t.is(response.responses[5].message, i18n.__('driver-order-new.to', 'foo'));
  t.is(response.responses[6].type, 'if');
  t.is(response.responses[6].condition.type, 'zero-price');
  t.is(response.responses[6].condition.value, '50');
  t.is(response.responses[6].ok.type, 'text');
  t.is(response.responses[6].ok.message, i18n.__('driver-order-new.price_not_set'));
  t.is(response.responses[6].err.type, 'text');
  t.is(response.responses[6].err.message, i18n.__('driver-order-new.price', '50'));
  t.is(response.responses[7].type, 'text');
  t.is(response.responses[7].message, i18n.__('driver-order-new.call_to_action'));
  t.is(response.responses[8].type, 'if');
  t.is(response.responses[8].condition.type, 'zero-price');
  t.is(response.responses[8].condition.value, '50');
  t.is(response.responses[8].ok.type, 'inline-options');
  t.is(response.responses[8].ok.rows[0][0].label, i18n.__('driver-order-new.set_my_price'));
  const button2 = response.responses[8].ok.rows[0][0].value;
  t.regex(button2, ss.guidRegex);
  t.is(response.responses[8].err.type, 'inline-options');
  t.is(response.responses[8].err.rows[0][0].label, i18n.__('driver-order-new.send_my_number'));
  const button1 = response.responses[8].err.rows[0][0].value;
  t.regex(button1, ss.guidRegex);
  t.is(response.responses[8].err.rows[0][1].label, i18n.__('driver-order-new.set_my_price'));
  t.is(response.responses[8].err.rows[0][1].value, button2);
  t.is(response.responses[9].type, 'redirect');
  t.is(response.responses[9].path, 'driver-index');

  t.deepEqual(response.responses[1].state.inlineValues.hash[button1], {
    type: 'call-action',
    route: 'passenger-contact-new-number',
    kicker: { menuLocation: 'order-submitted', currentOrderKey: 'd3adb33f' },
    userKey: 'cli_2',
    orderKey: 'd3adb33f',
    arg: {
      driverPhone: '(555) 123-11-22',
      distance: 10,
    },
  });

  t.deepEqual(response.responses[1].state.inlineValues.hash[button2], {
    type: 'call-action',
    route: 'save-and-redirect',
    kicker: { menuLocation: 'driver-index' },
    userKey: 'cli_1',
    arg: {
      passengerKey: 'cli_2',
      distance: 10,
      path: 'driver-order-set-price',
      orderKey: 'd3adb33f',
    },
  });
});
