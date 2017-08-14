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
import SelectUserType from '../../src/actions/menu/select-user-type';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new SelectUserType({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectUserType({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('select-user-type.who_you_are'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'driver');
  t.is(response.responses[1].rows[1][0].value, 'passenger');
});

test('should return composite response on post', t => {
  const action = new SelectUserType({ i18n, user });
  const response = action.post('driver');
  t.is(response.type, 'if');
  t.is(response.condition.type, 'in');
  t.is(response.condition.value, 'driver');
  t.deepEqual(response.condition.arr, ['driver', 'passenger']);
  t.is(response.ok.type, 'composite');
  t.is(response.ok.responses[0].type, 'user-state');
  t.is(response.ok.responses[0].state.userType, 'driver');
  t.is(response.ok.responses[1].type, 'text');
  t.is(response.ok.responses[1].message, '👌 OK!');
  t.is(response.ok.responses[2].type, 'redirect');
  t.is(response.ok.responses[2].path, 'request-phone');
  t.is(response.err.type, 'error');
  t.is(response.err.message, i18n.__('global.error_try_again'));
});
