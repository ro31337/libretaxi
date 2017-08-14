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

/* eslint-disable no-new */
import test from 'ava';
import SelectLocaleResponse from '../../src/responses/select-locale-response';

test('can be constructed with default parameters', t => {
  new SelectLocaleResponse({ locale: 'en' });
  t.pass();
});

test('should save properties and have \'user-state\' type', t => {
  const r = new SelectLocaleResponse({ locale: 'en' });
  t.is(r.locale, 'en');
  t.is(r.type, 'user-state');
});
