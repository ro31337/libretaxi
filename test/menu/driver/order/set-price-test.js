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

/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../../src/routes'; // to aviod circular dependencies
import DriverOrderSetPrice from '../../../../src/actions/menu/driver/order/set-price';
import { i18n } from '../../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {
    phone: '(555) 123-11-22',
    redirectArgs: {
      passengerKey: 'cli_2',
      distance: 5,
      orderKey: 'd3adb33f',
    },
    identity: 31337,
  },
};

test('can be constructed with default parameters', t => {
  const r = new DriverOrderSetPrice({ i18n, user });
  t.is(r.type, 'driver-order-set-price');
});

test('should return composite response on get', t => {
  const action = new DriverOrderSetPrice({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses.length, 3);
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('driver-order-set-price.set_price'));
  t.is(response.responses[2].type, 'request-user-input');
});

test('should return composite response on post', t => {
  const action = new DriverOrderSetPrice({ i18n, user });
  const response = action.post('100 with some details');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'call-action');
  t.is(response.responses[0].userKey, 'cli_2'); // passenger
  t.is(response.responses[0].route, 'passenger-contact-driver-price');
  t.deepEqual(response.responses[0].kicker, {
    menuLocation: 'order-submitted',
    currentOrderKey: 'd3adb33f',
  });
  t.deepEqual(response.responses[0].arg, {
    distance: 5,
    driverPhone: '(555) 123-11-22',
    price: '100 with some details',
    driverIdentity: 31337,
  });
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-index');
});
