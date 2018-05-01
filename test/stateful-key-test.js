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
import StatefulKey from '../src/stateful-key';
import checkNotNullTest from './helpers/check-not-null';
import checkPlatformTypeTest from './helpers/check-platform-type';

checkNotNullTest(['platformType', 'platformId'], (args) => { new StatefulKey(args); });
checkPlatformTypeTest(() => {
  new StatefulKey({ platformType: 'foo', platformId: 1 });
});

test('can be constructed with default parameters', t => {
  new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.pass();
});

test('should have string representation of the key', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.is(k.toString(), 'cli_1_foo');
});

test('should lower case string representation', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'FOO' });
  t.is(k.toString(), 'cli_1_foo');
});

test('should generate key without guid', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1 });
  t.is(k.toString(), 'cli_1');
});
