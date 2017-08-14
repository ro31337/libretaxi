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

import test from 'ava';
import Settings from '../settings';

test('not in settings, but test environment should be explicitly specified', t => {
  t.truthy(process.env.TEST_ENVIRONMENT);
});

test('settings props should be specified', t => {
  const settings = new Settings();
  t.truthy(settings.STATEFUL_CONNSTR);
  t.truthy(settings.STATEFUL_CREDENTIALS_FILE);
  t.truthy(typeof settings.TELEGRAM_TOKEN !== 'undefined');
  t.truthy(settings.DEFAULT_LANGUAGE);
  t.truthy(settings.LOG_FILE);
  t.truthy(typeof settings.GEOCODING_API_KEY !== 'undefined');
  t.is(settings.MAX_RADIUS, 10);
});

test('should allow to override props', t => {
  const settings = new Settings({ MAX_RADIUS: 31337 });
  t.is(settings.MAX_RADIUS, 31337);
});
