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
import dns from 'dns';
import redis from 'redis';

test.cb('localhost.firebaseio.test should be specified in /etc/hosts', t => {
  t.plan(1);
  dns.lookup('localhost.firebaseio.test', (err, result) => {
    if (!err) {
      t.is(result, '127.0.0.1');
    }
    t.end();
  });
});

test.cb('redis should be up and running', t => {
  const key = `before_all_test_${Number((Math.random() * 100000)).toFixed()}`; // make it random
  const client = redis.createClient({ host: '127.0.0.1', port: 6379, db: 1 });
  t.plan(1);
  client.on('error', (err) => t.fail(err));
  client.set(key, '31337', () => {
    client.get(key, (err, value) => {
      t.is(value, '31337');
      client.del(key, () => { t.end(); });
    });
  });
});
