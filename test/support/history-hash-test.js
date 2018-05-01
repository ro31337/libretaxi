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
import HistoryHash from '../../src/support/history-hash';

test('should accept empty parameters and have capacity set by default', t => {
  const hh = new HistoryHash();
  t.is(hh.capacity, 30);
});

test('should accept empty parameters and merge', t => {
  const hh = new HistoryHash();
  const hh2 = hh.merge({ foo: 'bar' });
  t.is(hh2.hash.foo, 'bar');
});

test('should accept hash and preserve existing params', t => {
  const hh = new HistoryHash({
    history: ['bar', 'foo'],
    hash: { foo: 11, bar: 22 },
  });
  const hh2 = hh.merge({ foo: 111 });
  t.deepEqual(hh2.hash, { foo: 111, bar: 22 });
  t.deepEqual(hh2.history, ['bar', 'foo']);
});

test('should remove old elements from hash and history', t => {
  const hh = new HistoryHash({
    capacity: 2,
    history: ['b', 'a'], // b is the oldest
    hash: { a: 1, b: 2 },
  });
  const hh2 = hh.merge({ c: 3 });
  t.deepEqual(hh2.hash, { a: 1, c: 3 });
  t.deepEqual(hh2.history, ['a', 'c']);
});

test('should add params up to capacity', t => {
  const hh = new HistoryHash({
    capacity: 4,
    history: ['b', 'a'],
    hash: { a: 1, b: 2 },
  });
  const hh2 = hh.merge({ c: 3, d: 4, e: 5 });
  t.deepEqual(hh2.hash, { a: 1, c: 3, d: 4, e: 5 });
  t.deepEqual(hh2.history[0], 'a');
});

test('should not mutate existing object', t => {
  const hh = new HistoryHash({
    capacity: 4,
    history: ['b', 'a'],
    hash: { a: 1, b: 2 },
  });
  hh.merge({ c: 3, d: 4, e: 5 });
  t.deepEqual(hh, { capacity: 4, history: ['b', 'a'], hash: { a: 1, b: 2 } });
});
