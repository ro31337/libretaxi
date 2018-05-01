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
/* eslint-disable no-unused-vars */

import test from 'ava';
import stateful from '../src/stateful';

class Demo1 extends stateful() {
  constructor(key) {
    super();
  }
}

class Demo2 extends stateful() {
  constructor(key) {
    super();
    this.stateful = {
      table: 'demo',
    };
  }
}

class Demo3 extends stateful() {
  constructor(key) {
    super();
    this.stateful = {
      key: '1',
    };
  }
}

test.cb('should throw error when stateful not configured', t => {
  const err = 'stateful mixin not configured';

  t.throws(() => {
    new Demo1().load();
  }, err);

  t.end();
});

test.cb('should throw error when key not specified', t => {
  const err = 'stateful "key" parameter not specified';

  t.throws(() => {
    new Demo2().load();
  }, err);

  t.end();
});

test.cb('should throw error when table not specified', t => {
  const err = 'stateful "table" parameter not specified';

  t.throws(() => {
    new Demo3().load();
  }, err);

  t.end();
});
