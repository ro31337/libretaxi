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
  h.api = { sendMessage: ss.sinon.spy() };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'Your choice?', { reply_markup:
    JSON.stringify({
      keyboard: [
        ['One', 'Two', 'Three'],
        ['OK', 'Cancel'],
      ],
      one_time_keyboard: true,
    }),
  }));
});
