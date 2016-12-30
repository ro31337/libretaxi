/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import PassengerContactDriverPrice from '../../../../src/actions/menu/passenger/contact/driver-price';
import { i18n } from '../../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new PassengerContactDriverPrice({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const args = {
    distance: 10,
    driverPhone: '(555) 123-11-22',
    price: '100 with some details',
    driverIdentity: { first: 'Foo', last: 'Bar', username: 'ro31337' },
  };
  const action = new PassengerContactDriverPrice({ i18n, user });
  const response = action.call(args);
  t.is(response.type, 'composite');
  t.is(response.responses.length, 3);
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('passenger-contact-driver-price.message',
    {
      driver: 'Driver (Foo Bar @ro31337)',
      phone: '(555) 123-11-22',
      distance: '10.0 km',
      price: '100 with some details',
    }));
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'order-submitted');
});
