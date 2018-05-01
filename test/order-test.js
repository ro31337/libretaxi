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
import Order from '../src/order';
import checkNotNullTest from './helpers/check-not-null';

checkNotNullTest('orderKey', (args) => { new Order(args); });

test('can be constructed with default parameters', t => {
  new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe' });
  t.pass();
});

test('saves orderKey', t => {
  const o = new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe' });
  t.is(o.orderKey, '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe');
});

test('can be constructed with extra parameters', t => {
  new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe', extra: 555 });
  t.pass();
});

test('order parameters should be accessible from outside', t => {
  const o = new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe', extra: 555 });
  t.is(o.orderKey, '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe');
  t.is(o.extra, 555);
  t.pass();
});

test('should set stateful params', t => {
  const o = new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe' });
  t.truthy(o.stateful);
  t.is(o.stateful.key, '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe');
  t.is(o.stateful.table, 'orders');
  t.pass();
});

test('should add to notified list and check if user was notified', t => {
  const order = new Order({ orderKey: '07b0f3af-7ed5-45c6-bdfe-f61d05a199fe' });
  order.init();
  order.markNotified('cli_1');
  order.markNotified('cli_2');
  t.truthy(order.isNotified('cli_1'));
  t.truthy(order.isNotified('cli_2'));
  t.falsy(order.isNotified('cli_3'));
});
