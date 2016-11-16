/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import HandlerFactory from '../../src/factories/response-handler-factory';
import TextResponse from '../../src/responses/text-response';
import OptionsResponse from '../../src/responses/options-response';
import UserStateResponse from '../../src/responses/user-state-response';
import SelectLocaleResponse from '../../src/responses/select-locale-response';
import CompositeResponse from '../../src/responses/composite-response';
import RedirectResponse from '../../src/responses/redirect-response';
import RequestPhoneResponse from '../../src/responses/request-phone-response';
import RequestLocationResponse from '../../src/responses/request-location-response';
import UpdateLocationResponse from '../../src/responses/update-location-response';
import RequestUserInputResponse from '../../src/responses/request-user-input-response';
import EmptyResponse from '../../src/responses/empty-response';
import CancelCurrentOrderResponse from '../../src/responses/cancel-current-order-response';
import ErrorResponse from '../../src/responses/error-response';
import IfResponse from '../../src/responses/if-response';
import SaveOrderResponse from '../../src/responses/submit-order/save-order-response';
import InformPassengerResponse from '../../src/responses/submit-order/inform-passenger-response';
import InterruptPromptResponse from '../../src/responses/interrupt-prompt-response';
import NotifyDriversResponse from '../../src/responses/submit-order/notify-drivers-response';
import InlineOptionsResponse from '../../src/responses/inline-options-response';
import CallActionResponse from '../../src/responses/call-action-response';

test('should return correct types for responses for cli platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const compositeResponse = new CompositeResponse();
  const redirectResponse = new RedirectResponse({ path: 'default' });
  const requestPhoneResponse = new RequestPhoneResponse();
  const requestLocationResponse = new RequestLocationResponse();
  const updateLocationResponse = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
  const requestUserInputResponse = new RequestUserInputResponse();
  const emptyResponse = new EmptyResponse();
  const cancelCurrentOrderResponse = new CancelCurrentOrderResponse();
  const errorResponse = new ErrorResponse({ message: 'foo' });
  const ifResponse = new IfResponse({ condition: {}, ok: {} });
  const saveOrderResponse = new SaveOrderResponse({
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    price: 50,
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
    requestedVehicleType: 'car',
  });
  const informPassenerResponse = new InformPassengerResponse({ passengerKey: 'cli_1' });
  const interruptPromptResponse = new InterruptPromptResponse();
  const notifyDriversResponse = new NotifyDriversResponse({ passengerKey: 'cli_1' });
  const inlineOptionsResponse = new InlineOptionsResponse({ rows: [] });
  const callActionResponse = new CallActionResponse({ userKey: 'cli_1', route: 'default' });

  const user = { platformType: 'cli' };

  const h1 = HandlerFactory.getHandler({ response: textResponse, user });
  const h2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const h3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const h4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });
  const h5 = HandlerFactory.getHandler({ response: compositeResponse, user });
  const h6 = HandlerFactory.getHandler({ response: redirectResponse, user });
  const h7 = HandlerFactory.getHandler({ response: requestPhoneResponse, user });
  const h8 = HandlerFactory.getHandler({ response: requestLocationResponse, user });
  const h9 = HandlerFactory.getHandler({ response: updateLocationResponse, user });
  const h10 = HandlerFactory.getHandler({ response: requestUserInputResponse, user });
  const h11 = HandlerFactory.getHandler({ response: emptyResponse, user });
  const h12 = HandlerFactory.getHandler({ response: cancelCurrentOrderResponse, user });
  const h13 = HandlerFactory.getHandler({ response: errorResponse, user });
  const h14 = HandlerFactory.getHandler({ response: ifResponse, user });
  const h15 = HandlerFactory.getHandler({ response: saveOrderResponse, user });
  const h16 = HandlerFactory.getHandler({ response: informPassenerResponse, user });
  const h17 = HandlerFactory.getHandler({ response: interruptPromptResponse, user });
  const h18 = HandlerFactory.getHandler({ response: notifyDriversResponse, user });
  const h19 = HandlerFactory.getHandler({ response: inlineOptionsResponse, user });
  const h20 = HandlerFactory.getHandler({ response: callActionResponse, user });

  t.is(h1.type, 'cli-text-response-handler');
  t.is(h2.type, 'cli-options-response-handler');
  t.is(h3.type, 'user-state-response-handler');
  t.is(h4.type, 'user-state-response-handler');
  t.is(h5.type, 'composite-response-handler');
  t.is(h6.type, 'redirect-response-handler');
  t.is(h7.type, 'cli-request-phone-response-handler');
  t.is(h8.type, 'cli-request-location-response-handler');
  t.is(h9.type, 'update-location-response-handler');
  t.is(h10.type, 'cli-request-user-input-response-handler');
  t.is(h11.type, 'empty-response-handler');
  t.is(h12.type, 'cancel-current-order-response-handler');
  t.is(h13.type, 'cli-error-response-handler');
  t.is(h14.type, 'if-response-handler');
  t.is(h15.type, 'save-order-response-handler');
  t.is(h16.type, 'inform-passenger-response-handler');
  t.is(h17.type, 'interrupt-prompt-response-handler');
  t.is(h18.type, 'notify-drivers-response-handler');
  t.is(h19.type, 'inline-options-response-handler');
  t.is(h20.type, 'call-action-response-handler');

  t.truthy(h1.user);
  t.truthy(h2.user);
  t.truthy(h3.user);
  t.truthy(h4.user);
  t.truthy(h5.user);
  t.truthy(h6.user);
  t.truthy(h7.user);
  t.truthy(h8.user);
  t.truthy(h9.user);
  t.truthy(h10.user);
  t.truthy(h11.user);
  t.truthy(h12.user);
  t.truthy(h13.user);
  t.truthy(h14.user);
  t.truthy(h15.user);
  t.truthy(h16.user);
  t.truthy(h17.user);
  t.truthy(h18.user);
  t.truthy(h19.user);
  t.truthy(h20.user);
});

test('should return correct types for responses for telegram platform', t => {
  const textResponse = new TextResponse({ message: 'foo' });
  const optionsResponse = new OptionsResponse({ rows: [] });
  const userStateResponse = new UserStateResponse({ foo: 1 });
  const selectLocaleResponse = new SelectLocaleResponse({ locale: 'en' });
  const compositeResponse = new CompositeResponse();
  const redirectResponse = new RedirectResponse({ path: 'default' });
  const requestPhoneResponse = new RequestPhoneResponse();
  const requestLocationResponse = new RequestLocationResponse();
  const updateLocationResponse = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
  const requestUserInputResponse = new RequestUserInputResponse();
  const emptyResponse = new EmptyResponse();
  const cancelCurrentOrderResponse = new CancelCurrentOrderResponse();
  const errorResponse = new ErrorResponse({ message: 'foo' });
  const ifResponse = new IfResponse({ condition: {}, ok: {} });
  const saveOrderResponse = new SaveOrderResponse({
    passengerKey: 'telegram_31337',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    price: 50,
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
    requestedVehicleType: 'car',
  });
  const informPassenerResponse = new InformPassengerResponse({ passengerKey: 'telegram_31337' });
  const interruptPromptResponse = new InterruptPromptResponse();
  const notifyDriversResponse = new NotifyDriversResponse({ passengerKey: 'cli_1' });
  const inlineOptionsResponse = new InlineOptionsResponse({ rows: [] });
  const callActionResponse = new CallActionResponse({ userKey: 'cli_1', route: 'default' });

  const user = { platformType: 'telegram' };

  const h1 = HandlerFactory.getHandler({ response: textResponse, user });
  const h2 = HandlerFactory.getHandler({ response: optionsResponse, user });
  const h3 = HandlerFactory.getHandler({ response: userStateResponse, user });
  const h4 = HandlerFactory.getHandler({ response: selectLocaleResponse, user });
  const h5 = HandlerFactory.getHandler({ response: compositeResponse, user });
  const h6 = HandlerFactory.getHandler({ response: redirectResponse, user });
  const h7 = HandlerFactory.getHandler({ response: requestPhoneResponse, user });
  const h8 = HandlerFactory.getHandler({ response: requestLocationResponse, user });
  const h9 = HandlerFactory.getHandler({ response: updateLocationResponse, user });
  const h10 = HandlerFactory.getHandler({ response: requestUserInputResponse, user });
  const h11 = HandlerFactory.getHandler({ response: emptyResponse, user });
  const h12 = HandlerFactory.getHandler({ response: cancelCurrentOrderResponse, user });
  const h13 = HandlerFactory.getHandler({ response: errorResponse, user });
  const h14 = HandlerFactory.getHandler({ response: ifResponse, user });
  const h15 = HandlerFactory.getHandler({ response: saveOrderResponse, user });
  const h16 = HandlerFactory.getHandler({ response: informPassenerResponse, user });
  const h17 = HandlerFactory.getHandler({ response: interruptPromptResponse, user });
  const h18 = HandlerFactory.getHandler({ response: notifyDriversResponse, user });
  const h19 = HandlerFactory.getHandler({ response: inlineOptionsResponse, user });
  const h20 = HandlerFactory.getHandler({ response: callActionResponse, user });

  t.is(h1.type, 'telegram-text-response-handler');
  t.is(h2.type, 'telegram-options-response-handler');
  t.is(h3.type, 'user-state-response-handler');
  t.is(h4.type, 'user-state-response-handler');
  t.is(h5.type, 'composite-response-handler');
  t.is(h5.response.type, 'composite');
  t.is(h5.response.origin.type, 'composite'); // should be decorated with OptimizedRequestLocation
  t.is(h5.response.origin.origin.type, 'composite'); // should be decorated OptimizedRequestPhone
  t.is(h5.response.origin.origin.origin.type, 'composite'); // should be decorated OptimizedOptions
  t.is(h6.type, 'redirect-response-handler');
  t.is(h7.type, 'telegram-request-phone-response-handler');
  t.is(h8.type, 'telegram-request-location-response-handler');
  t.is(h9.type, 'update-location-response-handler');
  t.is(h10.type, 'empty-response-handler');
  t.is(h11.type, 'empty-response-handler');
  t.is(h12.type, 'cancel-current-order-response-handler');
  t.is(h13.type, 'not-implemented-response-handler');
  t.is(h14.type, 'if-response-handler');
  t.is(h15.type, 'save-order-response-handler');
  t.is(h16.type, 'inform-passenger-response-handler');
  t.is(h17.type, 'empty-response-handler');
  t.is(h18.type, 'notify-drivers-response-handler');
  t.is(h19.type, 'not-implemented-response-handler');
  t.is(h20.type, 'call-action-response-handler');

  t.truthy(h1.user);
  t.truthy(h2.user);
  t.truthy(h3.user);
  t.truthy(h4.user);
  t.truthy(h5.user);
  t.truthy(h6.user);
  t.truthy(h7.user);
  t.truthy(h8.user);
  t.truthy(h9.user);
  t.truthy(h10.user);
  t.truthy(h11.user);
  t.truthy(h12.user);
  t.truthy(h13.user);
  t.truthy(h14.user);
  t.truthy(h15.user);
  t.truthy(h16.user);
  t.truthy(h17.user);
  t.truthy(h18.user);
  t.truthy(h19.user);
  t.truthy(h20.user);
});

test('should set optional api property platform', t => {
  const user = { platformType: 'telegram' };
  const api = { foo: 'bar' };
  const emptyResponse = new EmptyResponse();
  const h = HandlerFactory.getHandler({ response: emptyResponse, user, api });
  t.is(h.type, 'empty-response-handler');
  t.truthy(h.user);
  t.deepEqual(h.api, { foo: 'bar' });
});
