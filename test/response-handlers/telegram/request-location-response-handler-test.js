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
