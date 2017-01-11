/* eslint-disable no-new, no-console */
import test from 'ava';
import TextResponseHandler from '../../../src/response-handlers/telegram/text-response-handler';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new TextResponseHandler(args); });

test('can be constructed with default parameters', t => {
  const r = new TextResponseHandler({ response: {} });
  t.is(r.type, 'telegram-text-response-handler');
});

test.cb('should send message with notification disabled', t => {
  // arrange
  const r = { message: 'foo' };
  const h = new TextResponseHandler({ response: r });
  h.user = { platformId: 31337 };
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };

  // act
  h.call(() => {
    // assert
    t.truthy(h.api.sendMessage.calledWith(31337, 'foo',
      {
        disable_notification: true,
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      }));
    t.end();
  });
});

test.cb('should send message with bell with notification enabled', t => {
  // arrange
  const r = { message: '🔔 foo' };
  const h = new TextResponseHandler({ response: r });
  h.user = { platformId: 31337 };
  h.api = { sendMessage: ss.sinon.stub().returns({ catch: () => {} }) };

  // act
  h.call(() => {
    // assert
    t.truthy(h.api.sendMessage.calledWith(31337, '🔔 foo',
      {
        disable_notification: false,
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      }));
    t.end();
  });
});
