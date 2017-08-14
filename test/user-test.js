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
import User from '../src/user';
import checkNotNullTest from './helpers/check-not-null';
import checkPlatformTypeTest from './helpers/check-platform-type';

checkNotNullTest(['platformType', 'platformId'], (args) => { new User(args); });
checkPlatformTypeTest(() => {
  new User({ platformType: 'foo', platformId: 1 });
});

test('user can be constructed with default parameters', t => {
  new User({ platformType: 'cli', platformId: 1 });
  t.pass();
});

test('saves userKey', t => {
  const u = new User({ platformType: 'cli', platformId: 1 });
  t.is(u.userKey, 'cli_1');
});

test('user can be constructed with extra parameters', t => {
  new User({ platformType: 'cli', platformId: 1, extra: 555 });
  t.pass();
});

test('user parameters should be accessible from outside', t => {
  const u = new User({ platformType: 'cli', platformId: 1, extra: 555 });
  t.is(u.platformType, 'cli');
  t.is(u.platformId, 1);
  t.is(u.extra, 555);
  t.pass();
});

test('should set stateful params', t => {
  const u = new User({ platformType: 'cli', platformId: 1 });
  t.truthy(u.stateful);
  t.is(u.stateful.key, 'cli_1');
  t.is(u.stateful.table, 'users');
  t.pass();
});
