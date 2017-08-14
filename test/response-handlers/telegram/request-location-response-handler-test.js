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
import RequestLocationResponseHandler from '../../../src/response-handlers/telegram/request-location-response-handler'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new RequestLocationResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new RequestLocationResponseHandler({ response: {} });
  t.pass();
});

test('should call sendMessage', t => {
  const user = { platformId: 31337 };
  const h = new RequestLocationResponseHandler({ response: {}, user });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'Send location by clicking the button below',
    {
      disable_notification: true,
      reply_markup:
        JSON.stringify({
          keyboard: [[{ text: 'Send location', request_location: true }]],
          one_time_keyboard: true,
        }),
    }));
});

test('should call sendMessage with custom message', t => {
  const user = { platformId: 31337 };
  const h = new RequestLocationResponseHandler({ response: { message: 'foo' }, user });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'foo',
    {
      disable_notification: true,
      reply_markup:
        JSON.stringify({
          keyboard: [[{ text: 'Send location', request_location: true }]],
          one_time_keyboard: true,
        }),
    }));
});
