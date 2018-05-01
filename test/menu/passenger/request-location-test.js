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
import PassengerRequestLocation from '../../../src/actions/menu/passenger/request-location';
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
  t.is(response.responses[1].buttonText, i18n.__('global.location_button_text'));
});

test('should return composite response on post', t => {
  const action = new PassengerRequestLocation({ i18n, user });
  const response = action.post([37.421955, -122.084058]);
  t.is(response.type, 'if');
  t.is(response.condition.type, 'location');
  t.deepEqual(response.condition.value, [37.421955, -122.084058]);
  t.is(response.ok.type, 'composite');
  t.is(response.ok.responses[0].type, 'update-location');
  t.deepEqual(response.ok.responses[0].location, [37.421955, -122.084058]);
  t.is(response.ok.responses[1].type, 'user-state');
  t.deepEqual(response.ok.responses[1].state.location, [37.421955, -122.084058]);
  t.is(response.ok.responses[2].type, 'text');
  t.is(response.ok.responses[2].message, '👌 OK!');
  t.is(response.ok.responses[3].type, 'redirect');
  t.is(response.ok.responses[3].path, 'passenger-verify-location');
  t.is(response.err.type, 'error');
  t.is(response.err.message, i18n.__('global.error_location'));
});
