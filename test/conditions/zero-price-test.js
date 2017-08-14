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
import ZeroPrice from '../../src/conditions/zero-price';

test('can be constructed with default parameters', t => {
  const n = new ZeroPrice('0');
  t.is(n.type, 'zero-price');
});

test('should be truthy when price is zero', t => {
  t.truthy(new ZeroPrice('0').call());
  t.truthy(new ZeroPrice(' 0 ').call());
  t.truthy(new ZeroPrice('0 ').call());
  t.truthy(new ZeroPrice(' 0').call());
  t.truthy(new ZeroPrice(0).call());
  t.truthy(new ZeroPrice(' 0000 ').call());
});

test('should be falsy when price is not zero', t => {
  t.falsy(new ZeroPrice('1').call());
  t.falsy(new ZeroPrice('01').call());
  t.falsy(new ZeroPrice('10').call());
  t.falsy(new ZeroPrice('100000').call());
  t.falsy(new ZeroPrice('000001').call());
  t.falsy(new ZeroPrice(' 100 ').call());
});
