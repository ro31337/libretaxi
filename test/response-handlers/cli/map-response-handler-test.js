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

/* eslint-disable no-new, no-console */
import test from 'ava';
import MapResponseHandler from '../../../src/response-handlers/cli/map-response-handler';
import MapResponse from '../../../src/responses/map-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new MapResponseHandler(args); });

test('can be constructed with default parameters', t => {
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  new MapResponseHandler({ response });
  t.pass();
});

test.cb('prints google maps link to console', t => {
  // arrange
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  const h = new MapResponseHandler({ response });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  // act
  h.call(() => {
    // assert
    t.truthy(console.log.calledWith('https://www.google.com/maps?q=37.421955,-122.084058'));
    console.log = tmp;
    t.end();
  });
});
