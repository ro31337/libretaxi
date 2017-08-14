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
import SaveAndRedirect from '../../src/actions/menu/save-and-redirect';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters and has type', t => {
  const action = new SaveAndRedirect({ i18n, user });
  t.is(action.type, 'save-and-redirect');
  t.pass();
});

test('should return composite response on call', t => {
  const action = new SaveAndRedirect({ i18n, user });
  const response = action.call({ foo: 'bar', path: 'blank-screen' });
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.deepEqual(response.responses[0].state.redirectArgs, { foo: 'bar', path: 'blank-screen' });
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'blank-screen');
});
