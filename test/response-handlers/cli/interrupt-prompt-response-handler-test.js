/* eslint-disable no-new, no-console */
import test from 'ava';
import InterruptPromptResponseHandler from '../../../src/response-handlers/cli/interrupt-prompt-response-handler'; // eslint-disable-line max-len
import { ss } from '../../spec-support';

test('can be constructed with default parameters', t => {
  const h = new InterruptPromptResponseHandler({ response: {} });
  t.is(h.type, 'cli-interrupt-prompt-response-handler');
  t.pass();
});

test('calls interrupt prompt api on call', t => {
  // arrange
  t.plan(1);
  const spy = ss.sinon.spy();
  const h = new InterruptPromptResponseHandler({
    response: {},
    inquirer: {
      interruptPrompt: spy,
    },
  });
  // act
  h.call(31337);
  t.truthy(spy.calledWith(31337));
});
