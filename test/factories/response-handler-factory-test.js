/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import HandlerFactory from '../../src/factories/response-handler-factory';
import TextResponse from '../../src/responses/text-response';
import OptionsResponse from '../../src/responses/options-response';
import UserStateResponse from '../../src/responses/user-state-response';
import SelectLocaleResponse from '../../src/responses/select-locale-response';
import CompositeResponse from '../../src/responses/composite-response';

test('should return correct types for responses for cli platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const compositeResponse = new CompositeResponse();
  const user = { platformType: 'cli' };

  const h1 = HandlerFactory.getHandler({ response: textResponse, user });
  const h2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const h3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const h4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });
  const h5 = HandlerFactory.getHandler({ response: compositeResponse, user });

  t.is(h1.type, 'cli-text-response-handler');
  t.is(h2.type, 'cli-options-response-handler');
  t.is(h3.type, 'user-state-response-handler');
  t.is(h4.type, 'user-state-response-handler');
  t.is(h5.type, 'composite-response-handler');
});

test('should return correct types for responses for telegram platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const compositeResponse = new CompositeResponse();
  const user = { platformType: 'telegram' };

  const h1 = HandlerFactory.getHandler({ response: textResponse, user });
  const h2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const h3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const h4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });
  const h5 = HandlerFactory.getHandler({ response: compositeResponse, user });

  t.is(h1.type, 'not-implemented-response-handler');
  t.is(h2.type, 'not-implemented-response-handler');
  t.is(h3.type, 'user-state-response-handler');
  t.is(h4.type, 'user-state-response-handler');
  t.is(h5.type, 'composite-response-handler');
});

test('should pass user if user-related or composite', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const compositeResponse = new CompositeResponse();
  const user = { platformType: 'cli' };

  const h1 = HandlerFactory.getHandler({ response: textResponse, user });
  const h2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const h3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const h4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });
  const h5 = HandlerFactory.getHandler({ response: compositeResponse, user });

  t.falsy(h1.user);
  t.falsy(h2.user);
  t.truthy(h3.user);
  t.truthy(h4.user);
  t.truthy(h5.user);
});
