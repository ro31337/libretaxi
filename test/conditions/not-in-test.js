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
import NotIn from '../../src/conditions/not-in';

test('can be constructed with default parameters', t => {
  const c1 = new NotIn(2, [2, 4, 6]);
  t.is(c1.type, 'not-in');
});

test('should be truthy when element not in', t => {
  const c1 = new NotIn(1, [2, 4, 6]);
  const c2 = new NotIn('one', ['two', 'four', 'six']);
  t.truthy(c1.call());
  t.truthy(c2.call());
});

test('should be falsy when element in', t => {
  const c1 = new NotIn(4, [2, 4, 6]);
  const c2 = new NotIn('four', ['two', 'four', 'six']);
  t.falsy(c1.call());
  t.falsy(c2.call());
});
