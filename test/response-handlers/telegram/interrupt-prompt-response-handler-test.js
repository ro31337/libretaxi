/* eslint-disable no-new, no-console */
import test from 'ava';
import InterruptPromptResponseHandler from '../../../src/response-handlers/telegram/interrupt-prompt-response-handler'; // eslint-disable-line max-len
import { ss } from '../../spec-support';

test('can be constructed with default parameters', t => {
  const h = new InterruptPromptResponseHandler({ response: {} });
  t.is(h.type, 'telegram-interrupt-prompt-response-handler');
  t.pass();
});

test('should execute callback', t => {
  const h = new InterruptPromptResponseHandler({ response: {} });
  const onResult = ss.sinon.spy();
  h.call(onResult);
  t.is(onResult.called, true);
  t.pass();
});
