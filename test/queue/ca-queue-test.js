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
import CaQueue from '../../src/queue/ca-queue';

test('should have type', t => {
  const queue = new CaQueue();
  t.is(queue.type, 'call-action');
});

test.cb('should call createDelayed on redirect', t => {
  t.plan(3);
  const queue = new CaQueue();
  queue.createDelayed = (options) => {
    t.is(options.userKey, 'cli_1');
    t.is(options.arg, 'index');
    t.is(options.route, 'redirect');
    t.end();
  };
  queue.redirect({ userKey: 'cli_1', route: 'index' });
});
