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
import Numeric from '../../src/conditions/numeric';

test('can be constructed with default parameters', t => {
  const n = new Numeric(123);
  t.is(n.type, 'numeric');
});

test('should be truthy when numeric', t => {
  t.truthy(new Numeric(123).call());
  t.truthy(new Numeric('0').call());
  t.truthy(new Numeric('123').call());
  t.truthy(new Numeric(' 123').call());
  t.truthy(new Numeric('123 ').call());
  t.truthy(new Numeric(' 123 ').call());
  t.truthy(new Numeric('  123  ').call());
});

test('should be falsy when not numeric', t => {
  t.falsy(new Numeric('asd').call());
  t.falsy(new Numeric().call());
  t.falsy(new Numeric(' ').call());
});
