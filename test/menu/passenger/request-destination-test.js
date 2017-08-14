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
import PassengerRequestDestination from '../../../src/actions/menu/passenger/request-destination';
import { i18n } from '../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {},
};

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
  t.is(response.responses[2].path, 'passenger-request-price');
});
