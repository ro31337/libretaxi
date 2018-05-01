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
import Around from '../../src/conditions/around';

test('can be constructed with default parameters', t => {
  const c = new Around([1, 2], [1, 2], 10);
  t.is(c.type, 'around');
});

test('should pass smoke test', t => {
  // South San Francisco BART around 5 km of Golden Gate Bridge? (false)
  t.is(new Around([37.664059, -122.443742], [37.818293, -122.478375], 5).call(), false);
  // South San Francisco BART around 100 km of Golden Gate Bridge? (true)
  t.is(new Around([37.664059, -122.443742], [37.818293, -122.478375], 100).call(), true);
});
