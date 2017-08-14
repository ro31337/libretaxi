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

/* eslint-disable no-new, max-len */
import test from 'ava';
import setMyPrice, { SetMyPrice } from '../../../../../src/actions/menu/driver/order/buttons/set-my-price';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new SetMyPrice(args); });

test('can be constructed with default parameters', t => {
  const r = new SetMyPrice({ userKey: 'cli_1', arg: { foo: 'bar', orderKey: 'd3adb33f' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'save-and-redirect');
  t.deepEqual(r.kicker, { menuLocation: 'driver-index' });
  t.deepEqual(r.arg, { foo: 'bar', orderKey: 'd3adb33f' });
});

test('factory method should return stringified json response', t => {
  const response = setMyPrice({ passengerKey: 'cli_1', distance: 5, orderKey: 'd3adb33f' }, { userKey: 'cli_2' });
  // json example:
  // {"type":"call-action","route":"save-and-redirect","kicker":"driver-index","userKey":"cli_2","arg":{"passengerKey":"cli_1","distance":5,"path":"driver-order-set-price"}}
  t.deepEqual(response, {
    type: 'call-action',
    route: 'save-and-redirect',
    kicker: { menuLocation: 'driver-index' },
    userKey: 'cli_2',
    arg: {
      passengerKey: 'cli_1',
      distance: 5,
      path: 'driver-order-set-price',
      orderKey: 'd3adb33f',
    },
  });
});
