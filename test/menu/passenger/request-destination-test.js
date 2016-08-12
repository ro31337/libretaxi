/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import PassengerRequestDestination from '../../../src/menu/passenger/request-destination';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new PassengerRequestDestination({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new PassengerRequestDestination({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message,
    i18n.__('passenger-request-destination.provide_destination'));
  t.is(response.responses[1].type, 'request-user-input');
});

test('should return composite response on post', t => {
  const action = new PassengerRequestDestination({ i18n, user });
  const response = action.post('702 marshal street, redwood city');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.destination, '702 marshal street, redwood city');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'looking-for-taxi');
});
