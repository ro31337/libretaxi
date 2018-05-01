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

/* eslint-disable no-new, no-console */
import test from 'ava';
import Identity from '../../src/decorators/identity';

test('should decorate with undefined identity', t => {
  const identity = new Identity('Driver');
  t.is(identity.toString(), 'Driver');
});

test('should decorate with empty identity', t => {
  const identity = new Identity('Driver', {});
  t.is(identity.toString(), 'Driver');
});

test('should decorate with empty all props', t => {
  const identity = new Identity('Driver', { first: 'Foo', last: 'Bar', username: 'ro31337' });
  t.is(identity.toString(), 'Driver (Foo Bar @ro31337)');
});

test('should decorate with some missing props', t => {
  const identity1 = new Identity('Driver', { first: 'Foo', username: 'ro31337' });
  const identity2 = new Identity('Driver', { last: 'Bar', username: 'ro31337' });
  const identity3 = new Identity('Driver', { first: 'Foo', last: 'Bar' });
  t.is(identity1.toString(), 'Driver (Foo @ro31337)');
  t.is(identity2.toString(), 'Driver (Bar @ro31337)');
  t.is(identity3.toString(), 'Driver (Foo Bar)');
});

test('should decorate with some empty props', t => {
  const identity1 = new Identity('Driver', { first: 'Foo', last: '', username: 'ro31337' });
  const identity2 = new Identity('Driver', { first: '', last: 'Bar', username: 'ro31337' });
  const identity3 = new Identity('Driver', { first: 'Foo', last: 'Bar', username: '' });
  const identity4 = new Identity('Driver', { first: '', last: '', username: '' });
  t.is(identity1.toString(), 'Driver (Foo @ro31337)');
  t.is(identity2.toString(), 'Driver (Bar @ro31337)');
  t.is(identity3.toString(), 'Driver (Foo Bar)');
  t.is(identity4.toString(), 'Driver');
});
