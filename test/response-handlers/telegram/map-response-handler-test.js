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
import MapResponseHandler from '../../../src/response-handlers/telegram/map-response-handler'; // eslint-disable-line max-len
import MapResponse from '../../../src/responses/map-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new MapResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new MapResponseHandler({ response: {} });
  t.pass();
});

test.cb('should call sendLocation', t => {
  t.plan(1);
  const user = { platformId: 31337 };
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  const h = new MapResponseHandler({ response, user });
  h.api = { sendLocation: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => { // should call onResult
    t.truthy(h.api.sendLocation.calledWith(
      31337,
      37.421955,
      -122.084058,
      { disable_notification: true },
    ));
    t.end();
  });
});
