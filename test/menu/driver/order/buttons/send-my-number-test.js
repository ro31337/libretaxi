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
import sendMyNumber, { SendMyNumber } from '../../../../../src/actions/menu/driver/order/buttons/send-my-number.js';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new SendMyNumber(args); });

test('can be constructed with default parameters', t => {
  const r = new SendMyNumber({ userKey: 'cli_1', orderKey: 'd3adb33f', arg: { foo: 'bar' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'passenger-contact-new-number');
  t.deepEqual(r.kicker, { menuLocation: 'order-submitted', currentOrderKey: 'd3adb33f' });
  t.is(r.arg.foo, 'bar');
});

test('factory method should return stringified json response', t => {
  const response = sendMyNumber({ passengerKey: 'cli_1', distance: 5, orderKey: 'd3adb33f' }, { state: { phone: '12345', identity: 31337 } });
  // json example:
  // {"type":"call-action","route":"passenger-contact-new-number","kicker":"order-submitted","userKey":"cli_1","arg":{"driverPhone":"12345","distance":5}}
  t.deepEqual(response, {
    type: 'call-action',
    route: 'passenger-contact-new-number',
    kicker: { menuLocation: 'order-submitted', currentOrderKey: 'd3adb33f' },
    userKey: 'cli_1',
    orderKey: 'd3adb33f',
    arg: {
      driverPhone: '12345',
      distance: 5,
      driverIdentity: 31337,
    },
  });
});
