import TextResponseHandler from '../response-handlers/cli/text-response-handler';
import OptionsResponseHandler from '../response-handlers/cli/options-response-handler';
import UserStateResponseHandler from '../response-handlers/user-state-response-handler';
import NotImplementedResponseHandler from '../response-handlers/not-implemented-response-handler';
import CompositeResponseHandler from '../response-handlers/composite-response-handler';
import RedirectResponseHandler from '../response-handlers/redirect-response-handler';
import RequestPhoneResponseHandler from '../response-handlers/cli/request-phone-response-handler';
import RequestLocationResponseHandler from '../response-handlers/cli/request-location-response-handler'; // eslint-disable-line max-len
import UpdateLocationResponseHandler from '../response-handlers/update-location-response-handler'; // eslint-disable-line max-len
import RequestUserInputResponseHandler from '../response-handlers/cli/request-user-input-response-handler'; // eslint-disable-line max-len
import SubmitOrderResponseHandler from '../response-handlers/submit-order-response-handler'; // eslint-disable-line max-len
import EmptyResponseHandler from '../response-handlers/empty-response-handler';
import CancelCurrentOrderResponseHandler from '../response-handlers/cancel-current-order-response-handler'; // eslint-disable-line max-len
import ErrorResponseHandler from '../response-handlers/cli/error-response-handler';

// updating map?
// update test/factories/response-handler-factory-test.js

const map = {
  cli: {
    text: TextResponseHandler,
    options: OptionsResponseHandler,
    'user-state': UserStateResponseHandler,
    composite: CompositeResponseHandler,
    redirect: RedirectResponseHandler,
    'request-phone': RequestPhoneResponseHandler,
    'request-location': RequestLocationResponseHandler,
    'update-location': UpdateLocationResponseHandler,
    'request-user-input': RequestUserInputResponseHandler,
    'submit-order': SubmitOrderResponseHandler,
    empty: EmptyResponseHandler,
    'cancel-current-order': CancelCurrentOrderResponseHandler,
    error: ErrorResponseHandler,
  },
  telegram: {
    text: NotImplementedResponseHandler,
    options: NotImplementedResponseHandler,
    'user-state': UserStateResponseHandler,
    composite: CompositeResponseHandler,
    redirect: RedirectResponseHandler,
    'request-phone': NotImplementedResponseHandler,
    'request-location': NotImplementedResponseHandler,
    'update-location': UpdateLocationResponseHandler,
    'request-user-input': NotImplementedResponseHandler,
    'submit-order': SubmitOrderResponseHandler,
    empty: EmptyResponseHandler,
    'cancel-current-order': CancelCurrentOrderResponseHandler,
    error: NotImplementedResponseHandler,
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
   * @param {Object} options - hash of options.
   * @param {Response} options.response - response instance.
   * @param {User} options.user - user instance.
   */
  static getHandler(options) {
    const platformType = options.user.platformType;
    const response = options.response;
    const user = options.user;
    const t = response.type.toLowerCase();
    const klass = map[platformType][t];

    return new klass({ response, user }); // eslint-disable-line new-cap
  }
}
