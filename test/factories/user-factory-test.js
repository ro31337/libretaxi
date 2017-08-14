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
import UserFactory, { loadUser, mockLoadUser } from '../../src/factories/user-factory';

test('should create user by userKey', t => {
  const u = UserFactory.fromUserKey('cli_1');
  t.truthy(u);
  t.is(u.userKey, 'cli_1');
});

test.cb('should throw error when userKey not specified', t => {
  const err = 'userKey not specified';
  t.throws(() => { UserFactory.fromUserKey(); }, err);
  t.end();
});

test.cb('mockLoadUser should mock loadUser with mock', t => {
  t.plan(1);
  const mock = () => { t.pass(); t.end(); };
  mockLoadUser(mock);
  loadUser();
});
