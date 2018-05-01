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
import checkPlatformType from '../../src/validations/check-platform-type';
import { mix } from 'mixwith';

class Foo extends mix(class {}).with(checkPlatformType) {}

test.cb('should throw error when \'platformType\' parameter not supported', t => {
  const err = 'platform type \'bar\' not supported';
  t.throws(() => { new Foo({ platformType: 'bar' }); }, err);
  t.end();
});

test.cb('should not support empty or unspecified platform', t => {
  const err = '\'platformType\' parameter not specified';
  t.throws(() => { new Foo({ platformType: '' }); }, err);
  t.throws(() => { new Foo(); }, err);
  t.throws(() => { new Foo({}); }, err);
  t.end();
});

test('should support \'cli\' platform', t => {
  new Foo({ platformType: 'cli' });
  t.pass();
});
