import test from 'ava';
import InterruptPromptResponse from '../../src/responses/interrupt-prompt-response';

test('can be constructed with default parameters', t => {
  const response = new InterruptPromptResponse();
  t.is(response.type, 'interrupt-prompt');
  t.pass();
});
