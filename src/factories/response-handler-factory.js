/* eslint-disable max-len */
import CliTextResponseHandler from '../response-handlers/cli/text-response-handler';
import CliOptionsResponseHandler from '../response-handlers/cli/options-response-handler';
import UserStateResponseHandler from '../response-handlers/user-state-response-handler';
import NotImplementedResponseHandler from '../response-handlers/not-implemented-response-handler';
import CompositeResponseHandler from '../response-handlers/composite-response-handler';
import RedirectResponseHandler from '../response-handlers/redirect-response-handler';
import RequestPhoneResponseHandler from '../response-handlers/cli/request-phone-response-handler';
import RequestLocationResponseHandler from '../response-handlers/cli/request-location-response-handler';
import UpdateLocationResponseHandler from '../response-handlers/update-location-response-handler';
import RequestUserInputResponseHandler from '../response-handlers/cli/request-user-input-response-handler';
import EmptyResponseHandler from '../response-handlers/empty-response-handler';
import CancelCurrentOrderResponseHandler from '../response-handlers/cancel-current-order-response-handler';
import ErrorResponseHandler from '../response-handlers/cli/error-response-handler';
import IfResponseHandler from '../response-handlers/if-response-handler';
import SaveOrderResponseHandler from '../response-handlers/submit-order/save-order-response-handler';
import InformPassengerResponseHandler from '../response-handlers/submit-order/inform-passenger-response-handler';
import NotifyDriversResponseHandler from '../response-handlers/submit-order/notify-drivers-response-handler';
import InterruptPromptResponseHandler from '../response-handlers/cli/interrupt-prompt-response-handler';
import InlineOptionsResponseHandler from '../response-handlers/cli/inline-options-response-handler';
import CallActionResponseHandler from '../response-handlers/call-action-response-handler';
import TelegramTextResponseHandler from '../response-handlers/telegram/text-response-handler';
import TelegramOptionsResponseHandler from '../response-handlers/telegram/options-response-handler';
import OptimizedCompositeResponse from '../responses/decorators/optimized-composite-response';

// updating map?
// update test/factories/response-handler-factory-test.js

const map = {
  cli: {
    text: (...args) => new CliTextResponseHandler(...args),
    options: (...args) => new CliOptionsResponseHandler(...args),
    'user-state': (...args) => new UserStateResponseHandler(...args),
    composite: (...args) => new CompositeResponseHandler(...args),
    redirect: (...args) => new RedirectResponseHandler(...args),
    'request-phone': (...args) => new RequestPhoneResponseHandler(...args),
    'request-location': (...args) => new RequestLocationResponseHandler(...args),
    'update-location': (...args) => new UpdateLocationResponseHandler(...args),
    'request-user-input': (...args) => new RequestUserInputResponseHandler(...args),
    empty: (...args) => new EmptyResponseHandler(...args),
    'cancel-current-order': (...args) => new CancelCurrentOrderResponseHandler(...args),
    error: (...args) => new ErrorResponseHandler(...args),
    if: (...args) => new IfResponseHandler(...args),
    'save-order': (...args) => new SaveOrderResponseHandler(...args),
    'inform-passenger': (...args) => new InformPassengerResponseHandler(...args),
    'interrupt-prompt': (...args) => new InterruptPromptResponseHandler(...args),
    'notify-drivers': (...args) => new NotifyDriversResponseHandler(...args),
    'inline-options': (...args) => new InlineOptionsResponseHandler(...args),
    'call-action': (...args) => new CallActionResponseHandler(...args),
  },
  telegram: {
    text: (...args) => new TelegramTextResponseHandler(...args),
    options: (...args) => new TelegramOptionsResponseHandler(...args),
    'user-state': (...args) => new UserStateResponseHandler(...args),
    composite: (options) => new CompositeResponseHandler(
      Object.assign(
        {},
        options,
        { response: new OptimizedCompositeResponse({ origin: options.response }) } // decorate `response` parameter
      )),
    redirect: (...args) => new RedirectResponseHandler(...args),
    'request-phone': (...args) => new NotImplementedResponseHandler(...args),
    'request-location': (...args) => new NotImplementedResponseHandler(...args),
    'update-location': (...args) => new UpdateLocationResponseHandler(...args),
    'request-user-input': (...args) => new NotImplementedResponseHandler(...args),
    empty: (...args) => new EmptyResponseHandler(...args),
    'cancel-current-order': (...args) => new CancelCurrentOrderResponseHandler(...args),
    error: (...args) => new NotImplementedResponseHandler(...args),
    if: (...args) => new IfResponseHandler(...args),
    'save-order': (...args) => new SaveOrderResponseHandler(...args),
    'inform-passenger': (...args) => new InformPassengerResponseHandler(...args),
    'interrupt-prompt': (...args) => new EmptyResponseHandler(...args),
    'notify-drivers': (...args) => new NotifyDriversResponseHandler(...args),
    'inline-options': (...args) => new NotImplementedResponseHandler(...args),
    'call-action': (...args) => new CallActionResponseHandler(...args),
  },
};

/**
 * Response handler factory, implements factory method(s) to create
 * response handlers based on provided response and user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-15
 * @version 1.2
 * @since 0.1.0
 */
export default class ResponseHandlerFactory {
  /**
   * Creates concrete `ResponseHandler` instance based on response and user.
   * `response.type` and `user.platformType` used to determine which handler
   * to build. If `response.type` has word `user` of if it's `composite`,
   * then user object is passed to the handler along with response object.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-07-15
   * @param {object} options - hash of options.
   * @param {Response} options.response - response instance.
   * @param {User} options.user - user instance.
   * @param {object} options.api - (optional) transport library api.
   */
  static getHandler(options) {
    const platformType = options.user.platformType;
    const response = options.response;
    const user = options.user;
    const api = options.api;
    const t = response.type.toLowerCase();
    const builder = map[platformType][t];

    return builder({ response, user, api });
  }
}
