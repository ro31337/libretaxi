/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import DriverOrderNew from '../../../../src/actions/menu/driver/order/new';
import { i18n } from '../../../spec-support';

const user = { userKey: 'cli_1', state: { phone: '(555) 123-11-22' } };

test('can be constructed with default parameters', t => {
  new DriverOrderNew({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const args = { distance: 10, from: [37.421955, -122.084058], to: 'foo', price: '50',
    passengerKey: 'cli_2' };
  const action = new DriverOrderNew({ i18n, user });
  const response = action.call(args);
  const button1 = '{"type":"call-action","route":"passenger-contact-new-number","kicker":"order-submitted","userKey":"cli_2","arg":{"driverPhone":"(555) 123-11-22","distance":10}}';
  const button2 = '{"type":"call-action","route":"save-and-redirect","kicker":"driver-index","userKey":"cli_1","arg":{"passengerKey":"cli_2","distance":10,"path":"driver-order-set-price"}}';
  const button3 = '{"type":"call-action","route":"save-and-redirect","kicker":"driver-index","userKey":"cli_1","arg":{"passengerKey":"cli_2","distance":10,"path":"driver-order-offer-discount"}}';
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
  t.is(response.responses[5].type, 'if');
  t.is(response.responses[5].condition.type, 'zero-price');
  t.is(response.responses[5].condition.value, '50');
  t.is(response.responses[5].ok.type, 'text');
  t.is(response.responses[5].ok.message, i18n.__('driver-order-new.price_not_set'));
  t.is(response.responses[5].err.type, 'text');
  t.is(response.responses[5].err.message, i18n.__('driver-order-new.price', '50'));
  t.is(response.responses[6].type, 'text');
  t.is(response.responses[6].message, i18n.__('driver-order-new.call_to_action'));
  t.is(response.responses[7].type, 'if');
  t.is(response.responses[7].condition.type, 'zero-price');
  t.is(response.responses[7].condition.value, '50');
  t.is(response.responses[7].ok.type, 'inline-options');
  t.is(response.responses[7].ok.rows[0][0].label, i18n.__('driver-order-new.set_my_price'));
  t.is(response.responses[7].ok.rows[0][0].value, button2);
  t.is(response.responses[7].err.type, 'inline-options');
  t.is(response.responses[7].err.rows[0][0].label, i18n.__('driver-order-new.send_my_number'));
  t.is(response.responses[7].err.rows[0][0].value, button1);
  t.is(response.responses[7].err.rows[0][1].label, i18n.__('driver-order-new.set_my_price'));
  t.is(response.responses[7].err.rows[0][1].value, button2);
  t.is(response.responses[7].err.rows[0][2].label, i18n.__('driver-order-new.offer_discount'));
  t.is(response.responses[7].err.rows[0][2].value, button3);
  t.is(response.responses[8].type, 'redirect');
  t.is(response.responses[8].path, 'driver-index');
});
