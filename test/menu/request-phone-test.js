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
import routes from '../../src/routes'; // to aviod circular dependencies
import RequestPhone from '../../src/actions/menu/request-phone';
import { i18n } from '../spec-support';

test('can be constructed with default parameters', t => {
  new RequestPhone({ i18n, user: {} });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new RequestPhone({ i18n, user: {} });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('request-phone.type_your_phone'));
  t.is(response.responses[1].type, 'request-phone');
  t.is(response.responses[1].buttonText, i18n.__('request-phone.button_text'));
});

test('should return composite response on post for driver', t => {
  const user = { state: { userType: 'driver' } };

  const action = new RequestPhone({ i18n, user });
  const response = action.post('+1 (555) 111-22-33');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.phone, '+1 (555) 111-22-33');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-select-vehicle-type');
});

test('should return different composite response on post for passenger', t => {
  const user = { state: { userType: 'passenger' } };

  const action = new RequestPhone({ i18n, user });
  const response = action.post('+1 (555) 111-22-33');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.phone, '+1 (555) 111-22-33');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('request-phone.all_set'));
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'passenger-index');
});

test.cb('should throw error on post for unknown user type', t => {
  const user = { state: { userType: 'unknown' } };
  const action = new RequestPhone({ i18n, user });
  const err = 'unsupported user type';

  t.plan(1);
  t.throws(() => { action.post('whatever'); }, err);
  t.end();
});
