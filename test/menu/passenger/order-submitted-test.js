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
import OrderSubmitted from '../../../src/actions/menu/passenger/order-submitted';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new OrderSubmitted({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new OrderSubmitted({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('order-submitted.order_submitted'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'cancel');
});

test('should return composite response on post', t => {
  const action = new OrderSubmitted({ i18n, user });
  const response = action.post('cancel');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'cancel-current-order');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'blank-screen');
});

test('should return error response on posting unexpected input', t => {
  const action = new OrderSubmitted({ i18n, user });
  const response = action.post('whatever');
  t.is(response.type, 'error');
  t.is(response.message, i18n.__('order-submitted.error_incorrect_input'));
});
