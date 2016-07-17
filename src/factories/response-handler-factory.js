import TextResponseHandler from '../response-handlers/cli/text-response-handler';
import OptionsResponseHandler from '../response-handlers/cli/options-response-handler';
import UserStateResponseHandler from '../response-handlers/user-state-response-handler';
import NotImplementedResponseHandler from '../response-handlers/not-implemented-response-handler';

const map = {
  cli: {
    text: TextResponseHandler,
    options: OptionsResponseHandler,
    'user-state': UserStateResponseHandler,
  },
  telegram: {
    text: NotImplementedResponseHandler,
    options: NotImplementedResponseHandler,
    'user-state': UserStateResponseHandler,
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
   * `response.type` and `user.platformId` used to determine which handler
   * to build. If `response.type` has word `user`, then user object is passed
   * to the handler.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-07-15
   * @param {Response} options.response - response instance.
   * @param {User} options.user - user instance.
   */
  static getHandler(options) {
    const platformId = options.user.platformId;
    const response = options.response;
    const user = options.user;
    const t = response.type.toLowerCase();
    const klass = map[platformId][t];

    if (t.includes('user')) {
      return new klass({ response, user }); // eslint-disable-line new-cap
    }

    return new klass({ response }); // eslint-disable-line new-cap
  }
}
