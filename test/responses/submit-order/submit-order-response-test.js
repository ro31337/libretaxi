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
import SubmitOrderResponse from '../../../src/responses/submit-order/submit-order-response';

test('response can be constructed with default parameters', t => {
  const r = new SubmitOrderResponse({
    orderKey: 'uuid',
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    price: 50,
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
    requestedVehicleType: 'car',
  });
  t.is(r.type, 'composite');
  t.is(r.responses[0].type, 'save-order');
  t.is(r.responses[1].type, 'inform-passenger');
  t.is(r.responses[2].type, 'notify-drivers');
});
