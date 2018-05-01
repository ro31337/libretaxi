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
import routes from '../../src/routes'; // to aviod circular dependencies
import ConfirmLocale from '../../src/actions/menu/confirm-locale';
import { i18n } from '../spec-support';

const user = { state: { locale: 'en' } };

test('can be constructed with default parameters', t => {
  new ConfirmLocale({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new ConfirmLocale({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'English ?');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'yes');
  t.is(response.responses[1].rows[0][0].label, '✅ Yes');
  t.is(response.responses[1].rows[0][1].value, 'no');
  t.is(response.responses[1].rows[0][1].label, '❌ No');
  t.is(response.responses[1].defaultMessage, i18n.__('global.default_options_message'));
});

test('should return composite response on post', t => {
  const action = new ConfirmLocale({ i18n, user });
  const response = action.post(31337);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'if');
  t.is(response.responses[0].condition.type, 'equals');
  t.is(response.responses[0].condition.actual, 31337);
  t.is(response.responses[0].condition.expected, 'yes');
  t.is(response.responses[0].ok.type, 'composite');
  t.is(response.responses[0].ok.responses[0].type, 'text');
  t.is(response.responses[0].ok.responses[0].message, '👌 OK!');
  t.is(response.responses[0].ok.responses[1].type, 'redirect');
  t.is(response.responses[0].ok.responses[1].path, 'select-user-type');
  t.falsy(response.responses[0].err);

  t.is(response.responses[1].type, 'if');
  t.is(response.responses[1].condition.type, 'equals');
  t.is(response.responses[1].condition.actual, 31337);
  t.is(response.responses[1].condition.expected, 'no');
  t.is(response.responses[1].ok.type, 'redirect');
  t.is(response.responses[1].ok.path, 'select-locale');
  t.falsy(response.responses[1].err);
});
