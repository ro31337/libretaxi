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
import Equals from '../../src/conditions/equals';

test('can be constructed with default parameters', t => {
  const c1 = new Equals(2 + 2, 4);
  const c2 = new Equals(2 + 2, 5);
  t.is(c1.type, 'equals');
  t.is(c2.type, 'equals');
});

test('should be truthy for truthy condition', t => {
  const c = new Equals(2 + 2, 4);
  t.truthy(c.call());
});

test('should be falsy for falsy condition', t => {
  const c = new Equals(2 + 2, 5);
  t.falsy(c.call());
});
