/* eslint-disable no-new, no-console */
import test from 'ava';
import ErrorResponseHandler from '../../../src/response-handlers/telegram/error-response-handler';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new ErrorResponseHandler(args); });

test('can be constructed with default parameters', t => {
  const r = new ErrorResponseHandler({ response: {} });
  t.is(r.type, 'telegram-error-response-handler');
});

test.cb('should send message to specified user with api', t => {
  // arrange
  const r = { message: 'foo' };
  const h = new ErrorResponseHandler({ response: r });
  h.user = { platformId: 31337 };
  h.api = { sendMessage: ss.sinon.spy() };

  // act
  h.call(() => {
    // assert
    t.truthy(h.api.sendMessage.calledWith(31337, '❌ foo'));
    t.end();
  });
});
