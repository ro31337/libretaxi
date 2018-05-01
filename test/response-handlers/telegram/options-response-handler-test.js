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
import OptionsResponseHandler from '../../../src/response-handlers/telegram/options-response-handler'; // eslint-disable-line max-len
import OptionsResponse from '../../../src/responses/options-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new OptionsResponseHandler(args); });

const responseObject = new OptionsResponse({
  rows: [
    [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Three', value: '3' }],
    [{ label: 'OK', value: 'ok' }, { label: 'Cancel', value: 'cancel' }],
  ],
});

test('can be constructed with default parameters', t => {
  new OptionsResponseHandler({ response: {} });
  t.pass();
});

test('should call sendMessage', t => {
  const user = { platformId: 31337 };
  const h = new OptionsResponseHandler({ response: responseObject, user });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'Your choice?', {
    disable_notification: true,
    reply_markup:
      JSON.stringify({
        keyboard: [
          ['One', 'Two', 'Three'],
          ['OK', 'Cancel'],
        ],
        one_time_keyboard: true,
      }),
  }));
});

test('should call sendMessage with default text message', t => {
  const user = { platformId: 31337 };
  const h = new OptionsResponseHandler({
    response: new OptionsResponse({ rows: responseObject.rows, defaultMessage: 'default message' }),
    user,
  });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'default message', {
    disable_notification: true,
    reply_markup:
      JSON.stringify({
        keyboard: [
          ['One', 'Two', 'Three'],
          ['OK', 'Cancel'],
        ],
        one_time_keyboard: true,
      }),
  }));
});
