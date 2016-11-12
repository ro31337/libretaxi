/* eslint-disable no-new, no-console */
import test from 'ava';
import RequestPhoneResponseHandler from '../../../src/response-handlers/telegram/request-phone-response-handler'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new RequestPhoneResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new RequestPhoneResponseHandler({ response: {} });
  t.pass();
});

test('should call sendMessage', t => {
  const user = { platformId: 31337 };
  const h = new RequestPhoneResponseHandler({ response: {}, user });
  h.api = { sendMessage: ss.sinon.spy() };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'Send number by clicking the button below',
    {
      reply_markup:
        JSON.stringify({
          keyboard: [[{ text: 'Send number', request_contact: true }]],
          one_time_keyboard: true,
        }),
    }));
});

test('should call sendMessage with custom message', t => {
  const user = { platformId: 31337 };
  const h = new RequestPhoneResponseHandler({ response: { message: 'foo' }, user });
  h.api = { sendMessage: ss.sinon.spy() };
  h.call(() => t.fail()); // and should not call onResult
  t.truthy(h.api.sendMessage.calledWith(31337, 'foo',
    {
      reply_markup:
        JSON.stringify({
          keyboard: [[{ text: 'Send number', request_contact: true }]],
          one_time_keyboard: true,
        }),
    }));
});
