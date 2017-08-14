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
  t.is(response.responses.length, 4);
  t.is(response.responses[0].type, 'interrupt-prompt');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('passenger-contact-driver-price.message',
    {
      driver: 'Driver (Foo Bar @ro31337)',
      distance: '10.0 km',
      price: '100 with some details',
    }));
  t.is(response.responses[2].type, 'text');
  t.is(response.responses[2].important, true);
  t.is(response.responses[2].message, i18n.__('global.phone', '(555) 123-11-22'));
  t.is(response.responses[3].type, 'redirect');
  t.is(response.responses[3].path, 'order-submitted');
});
