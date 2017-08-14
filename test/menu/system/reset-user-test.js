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
import ResetUser from '../../../src/actions/menu/system/reset-user';
import { i18n } from '../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {},
};

test('can be constructed with default parameters', t => {
  new ResetUser({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new ResetUser({ i18n, user });
  const response = action.call();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'user-state');
  t.is(response.responses[1].state.menuLocation, 'default');
});
