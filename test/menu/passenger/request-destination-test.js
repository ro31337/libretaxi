/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import PassengerRequestDestination from '../../../src/actions/menu/passenger/request-destination';
import { i18n } from '../../spec-support';

const user = { userKey: 'cli_1', state: { location: [37.421955, -122.084058] } };

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
  t.is(response.responses[1].type, 'save-order');
  t.is(response.responses[1].order.passengerKey, 'cli_1');
  t.deepEqual(response.responses[1].order.passengerLocation, [37.421955, -122.084058]);
  t.is(response.responses[1].order.passengerDestination, '702 marshal street, redwood city');
  t.truthy(response.responses[1].order.createdAt);
  t.is(response.responses[2].type, 'text');
  t.is(response.responses[2].message, '👌 OK!');
  t.is(response.responses[3].type, 'redirect');
  t.is(response.responses[3].path, 'blank-screen');
});
