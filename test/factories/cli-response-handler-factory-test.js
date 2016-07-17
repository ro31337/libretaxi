/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import HandlerFactory from '../../src/factories/cli-response-handler-factory';
import TextResponse from '../../src/responses/text-response';
import OptionsResponse from '../../src/responses/options-response';
import UserStateResponse from '../../src/responses/user-state-response';
import SelectLocaleResponse from '../../src/responses/select-locale-response';

test('should return correct types for responses', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });

  const r1 = HandlerFactory.fromResponse(textResponse);
  const r2 = HandlerFactory.fromResponse(optionsResponse);
  const r3 = HandlerFactory.fromResponse(userStateResponse, {});
  const r4 = HandlerFactory.fromResponse(selectLocaleResponse, {});

  t.is(r1.type, 'cli-text-response-handler');
  t.is(r2.type, 'cli-options-response-handler');
  t.is(r3.type, 'user-state-response-handler');
  t.is(r4.type, 'user-state-response-handler');
});
