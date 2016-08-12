/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import PassengerRequestLocation from '../../../src/menu/passenger/request-location';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new PassengerRequestLocation({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new PassengerRequestLocation({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('passenger-request-location.provide_location'));
  t.is(response.responses[1].type, 'request-location');
});

test('should return composite response on post', t => {
  const action = new PassengerRequestLocation({ i18n, user });
  const response = action.post([37.421955, -122.084058]);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'update-location');
  t.deepEqual(response.responses[0].location, [37.421955, -122.084058]);
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'passenger-request-destination');
});
