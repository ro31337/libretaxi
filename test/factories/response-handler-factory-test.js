/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import HandlerFactory from '../../src/factories/response-handler-factory';
import TextResponse from '../../src/responses/text-response';
import OptionsResponse from '../../src/responses/options-response';
import UserStateResponse from '../../src/responses/user-state-response';
import SelectLocaleResponse from '../../src/responses/select-locale-response';

test('should return correct types for responses for cli platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const user = { platformType: 'cli' };

  const r1 = HandlerFactory.getHandler({ response: textResponse, user });
  const r2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const r3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const r4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });

  t.is(r1.type, 'cli-text-response-handler');
  t.is(r2.type, 'cli-options-response-handler');
  t.is(r3.type, 'user-state-response-handler');
  t.is(r4.type, 'user-state-response-handler');
});

test('should return correct types for responses for telegram platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const user = { platformType: 'telegram' };

  const r1 = HandlerFactory.getHandler({ response: textResponse, user });
  const r2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const r3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const r4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });

  t.is(r1.type, 'not-implemented-response-handler');
  t.is(r2.type, 'not-implemented-response-handler');
  t.is(r3.type, 'user-state-response-handler');
  t.is(r4.type, 'user-state-response-handler');
});
