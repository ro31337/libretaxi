/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import HandlerFactory from '../../src/factories/cli-response-handler-factory';
import TextResponse from '../../src/responses/text-response';
import OptionsResponse from '../../src/responses/options-response';

test('should return correct types for responses', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });

  const r1 = HandlerFactory.fromResponse(textResponse);
  const r2 = HandlerFactory.fromResponse(optionsResponse);

  t.is(r1.type, 'cli-text-response-handler');
  t.is(r2.type, 'cli-options-response-handler');
});
