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

/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import OrderCancelled from '../../../src/actions/menu/passenger/order-cancelled';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new OrderCancelled({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new OrderCancelled({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('order-cancelled.order_cancelled'));
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'passenger-index');
});
