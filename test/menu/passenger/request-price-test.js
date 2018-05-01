/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import PassengerRequestPrice from '../../../src/actions/menu/passenger/request-price';
import { i18n, ss } from '../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {
    location: [37.421955, -122.084058],
    requestedVehicleType: 'motorbike',
    destination: '702 marshal street, redwood city',
  },
};

test('can be constructed with default parameters', t => {
  new PassengerRequestPrice({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new PassengerRequestPrice({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message,
    i18n.__('passenger-request-price.set_price'));
  t.is(response.responses[1].type, 'request-user-input');
});

test('should return conditional response on post', t => {
  const action = new PassengerRequestPrice({ i18n, user });
  const response = action.post('50');
  t.is(response.type, 'if');
  t.is(response.condition.type, 'numeric');
  t.is(response.condition.value, '50');

  const okResponse = response.ok;
  const errResponse = response.err;

  t.is(okResponse.type, 'composite');
  t.is(okResponse.responses[0].type, 'user-state');
  t.is(okResponse.responses[0].state.price, '50');
  // composite
  t.is(okResponse.responses[1].type, 'composite');
  // that contains: 1. save order
  t.is(okResponse.responses[1].responses[0].type, 'save-order');
  t.is(okResponse.responses[1].responses[0].order.passengerKey, 'cli_1');
  t.deepEqual(okResponse.responses[1].responses[0].order.passengerLocation, [37.421955, -122.084058]); // eslint-disable-line max-len
  t.is(okResponse.responses[1].responses[0].order.passengerDestination, '702 marshal street, redwood city'); // eslint-disable-line max-len
  t.truthy(okResponse.responses[1].responses[0].order.createdAt);
  t.is(okResponse.responses[1].responses[0].order.price, '50');
  t.is(okResponse.responses[1].responses[0].order.requestedVehicleType, 'motorbike');
  t.regex(okResponse.responses[1].responses[0].order.orderKey, ss.guidRegex);
  // 2. inform passenger
  t.is(okResponse.responses[1].responses[1].type, 'inform-passenger');
  t.is(okResponse.responses[1].responses[1].passengerKey, 'cli_1');
  // 3. notify drivers
  t.is(okResponse.responses[1].responses[2].type, 'notify-drivers');
  t.is(okResponse.responses[1].responses[2].passengerKey, 'cli_1');
  // call action to show message in 20 mins
  t.is(okResponse.responses[2].type, 'call-action');
  t.is(okResponse.responses[2].userKey, 'cli_1');
  t.is(okResponse.responses[2].route, 'show-message');
  t.regex(okResponse.responses[2].arg.expectedState.currentOrderKey, ss.guidRegex);
  t.is(okResponse.responses[2].arg.expectedState.menuLocation, 'order-submitted');
  t.is(okResponse.responses[2].arg.message, i18n.__('passenger-request-price.on_timeout'));
  t.is(okResponse.responses[2].arg.path, 'passenger-index');
  t.is(okResponse.responses[2].delay, 20 * 60 * 1000);
  // text and redirect
  t.is(okResponse.responses[3].type, 'text');
  t.is(okResponse.responses[3].message, '👌 OK!');
  t.is(okResponse.responses[4].type, 'redirect');
  t.is(okResponse.responses[4].path, 'blank-screen');

  t.is(errResponse.type, 'composite');
  t.is(errResponse.responses[0].type, 'error');
  t.is(errResponse.responses[0].message, i18n.__('passenger-request-price.should_be_numeric'));
  t.is(errResponse.responses[1].type, 'redirect');
  t.is(errResponse.responses[1].path, 'passenger-request-price');
});
