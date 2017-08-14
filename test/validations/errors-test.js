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
import { ArgumentError } from '../../src/validations/errors';

test.cb('should have error message when thrown', t => {
  const err = 'something';

  t.throws(() => {
    throw new ArgumentError('something');
  }, err);

  t.end();
});

test('should have message property', t => {
  const err = new ArgumentError('something');
  t.is(err.message, 'something');
});
