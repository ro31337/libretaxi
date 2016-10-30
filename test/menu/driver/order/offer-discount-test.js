/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import DriverOrderOfferDiscount from '../../../../src/actions/menu/driver/order/offer-discount';
import { i18n } from '../../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {
    phone: '(555) 123-11-22',
    redirectArgs: {
      passengerKey: 'cli_2',
      distance: 5,
    },
  },
};

test('can be constructed with default parameters', t => {
  const r = new DriverOrderOfferDiscount({ i18n, user });
  t.is(r.type, 'driver-order-offer-discount');
});

test('should return composite response on get', t => {
  const action = new DriverOrderOfferDiscount({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses.length, 3);
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('driver-order-offer-discount.offer_discount'));
  t.is(response.responses[2].type, 'request-user-input');
});

test('should return composite response on post', t => {
  const action = new DriverOrderOfferDiscount({ i18n, user });
  const response = action.post('100 with some details');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'call-action');
  t.is(response.responses[0].userKey, 'cli_2'); // passenger
  t.is(response.responses[0].route, 'passenger-contact-driver-discount');
  t.is(response.responses[0].kicker, 'order-submitted');
  t.deepEqual(response.responses[0].arg, {
    distance: 5,
    driverPhone: '(555) 123-11-22',
    price: '100 with some details',
  });
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-index');
});
