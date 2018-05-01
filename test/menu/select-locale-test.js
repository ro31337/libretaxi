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
import SelectLocale from '../../src/actions/menu/select-locale';
import locales from '../../src/validations/supported-locales';

const user = { state: {} };

test('can be constructed with default parameters', t => {
  new SelectLocale({ i18n: {}, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses.length, 2);
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'Select your language (page 1/6):');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].totalItems, locales.length);
});

const assertConfirm = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'confirm-locale');
};

test('should return conditional response on post', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.post('next');
  t.is(response.type, 'if');
  t.is(response.condition.type, 'in');
  t.is(response.condition.value, 'next');
  t.deepEqual(response.condition.arr, ['next', 'previous']);
  t.is(response.ok.type, 'user-state');
  t.is(response.ok.state.selectLocalePage, 2);
  t.is(response.err.type, 'if');
  t.is(response.err.condition.type, 'in');
  t.is(response.err.condition.value, 'next');
  t.deepEqual(response.err.condition.arr, locales);
  assertConfirm(t, response.err.ok);
});
