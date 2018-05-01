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
import UserFactory, { loadUser } from '../../src/factories/user-factory';
import { ss } from '../spec-support';

test('should call user factory on loadUser', t => {
  // arrange
  // stub UserFactory and return pre-defined user object
  const myUserFactory = {};
  const fromUserKey = ss.sinon.stub().returns(myUserFactory);
  const load = ss.sinon.stub().returns(31337);
  Object.assign(myUserFactory, { fromUserKey, load });
  UserFactory.fromUserKey = fromUserKey;

  // act
  const u = loadUser('cli_1');

  // assert
  t.is(u, 31337);
  t.truthy(fromUserKey.calledWith('cli_1'));
  t.truthy(load.calledWith());
});

// do not move `mockLoadUser` test here, because tests run in parallel.
