/* eslint-disable no-new, max-len */
import test from 'ava';
import InlineOptionsResponseHandler from '../../../src/response-handlers/telegram/inline-options-response-handler';
import InlineOptionsResponse from '../../../src/responses/options-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new InlineOptionsResponseHandler(args); });

const responseObject = new InlineOptionsResponse({
  rows: [
    [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Three', value: '3' }],
    [{ label: 'OK', value: 'ok' }, { label: 'Cancel', value: 'cancel' }],
  ],
});

test('can be constructed with default parameters', t => {
  new InlineOptionsResponseHandler({ response: {} });
  t.pass();
});

test.cb('should call sendMessage', t => {
  t.plan(1);
  const user = { platformId: 31337 };
  const h = new InlineOptionsResponseHandler({ response: responseObject, user });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => { // should call onResult
    t.truthy(h.api.sendMessage.calledWith(31337, 'Your choice?', {
      disable_notification: true,
      reply_markup:
        JSON.stringify({
          inline_keyboard: [
            [
              { text: 'One', callback_data: '1' },
              { text: 'Two', callback_data: '2' },
              { text: 'Three', callback_data: '3' },
            ],
            [
              { text: 'OK', callback_data: 'ok' },
              { text: 'Cancel', callback_data: 'cancel' },
            ],
          ],
        }),
    }));
    t.end();
  });
});

test.cb('should call sendMessage with default message', t => {
  t.plan(1);
  const user = { platformId: 31337 };
  const h = new InlineOptionsResponseHandler({
    response: new InlineOptionsResponse({ rows: responseObject.rows, defaultMessage: 'foo' }),
    user,
  });
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };
  h.call(() => { // should call onResult
    t.truthy(h.api.sendMessage.calledWith(31337, 'foo', {
      disable_notification: true,
      reply_markup:
        JSON.stringify({
          inline_keyboard: [
            [
              { text: 'One', callback_data: '1' },
              { text: 'Two', callback_data: '2' },
              { text: 'Three', callback_data: '3' },
            ],
            [
              { text: 'OK', callback_data: 'ok' },
              { text: 'Cancel', callback_data: 'cancel' },
            ],
          ],
        }),
    }));
    t.end();
  });
});
