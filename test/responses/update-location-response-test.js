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
import UpdateLocationResponse from '../../src/responses/update-location-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('location', (args) => { new UpdateLocationResponse(args); });

const location = [37.421955, -122.084058];

test('can be constructed with default parameters', t => {
  new UpdateLocationResponse({ location });
  t.pass();
});

test('should have type', t => {
  const r = new UpdateLocationResponse({ location });
  t.is(r.type, 'update-location');
});

test('should save location property', t => {
  const r = new UpdateLocationResponse({ location });
  t.is(r.location[0], 37.421955);
  t.is(r.location[1], -122.084058);
});
