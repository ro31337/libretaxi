/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import PassengerContactNewNumber from '../../../../src/actions/menu/passenger/contact/new-number';
import { i18n } from '../../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new PassengerContactNewNumber({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const args = { distance: 10, driverPhone: '(555) 123-11-22' };
  const action = new PassengerContactNewNumber({ i18n, user });
  const response = action.call(args);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('passenger-contact-new-number.message',
    { phone: '(555) 123-11-22', distance: '10.0 km' }));
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'order-submitted');
});
