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
import InformPassengerResponseHandler from '../../../src/response-handlers/submit-order/inform-passenger-response-handler'; // eslint-disable-line max-len
import InformPassengerResponse from '../../../src/responses/submit-order/inform-passenger-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new InformPassengerResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new InformPassengerResponseHandler({ response: {} });
  t.pass();
});

test.cb('should post message to the queue when informing passenger', t => {
  // arrange
  t.plan(1);
  const response = new InformPassengerResponse({ passengerKey: 'cli_1' });
  const spy = ss.sinon.spy();
  const handler = new InformPassengerResponseHandler({ response });
  handler.queue = { redirect: spy };

  // act
  handler.call(() => {
    // assert
    t.truthy(spy.calledWith({ userKey: 'cli_1', route: 'order-submitted' }));
    t.end();
  });
});
