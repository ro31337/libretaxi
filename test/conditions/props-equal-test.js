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
import PropsEqual from '../../src/conditions/props-equal';

test('can be constructed with default parameters', t => {
  new PropsEqual({}, {});
  t.pass();
});

test('should be truthy when fragment is present', t => {
  const c = new PropsEqual({ foo: 'bar' }, { baz: 'qux', foo: 'bar' });
  t.is(c.call(), true);
});

test('should be falsy when fragment is not present', t => {
  const c = new PropsEqual({ foo1: 'bar1' }, { baz: 'qux', foo: 'bar' });
  t.is(c.call(), false);
});

test('should support multiple props', t => {
  const c = new PropsEqual({ a: 1, b: 2 }, { c: 3, b: 2, a: 1 });
  t.is(c.call(), true);
});
