import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null.js';
import UserFactory from '../../factories/user-factory';
import ResponseHandlerFactory from '../../factories/response-handler-factory';

/**
 * Inline button callback. Executes handler against stringified response stored in
 * provided `value`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @date 2016-10-16
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineButtonCallback extends mix(class {}).with(checkNotNull('value')) {

  /**
   * Constructor.
   *
   * @param {object} options - hash of parameters
   * @param {string} options.value - stringified {@link Response}
   */
  constructor(options) {
    super(options);
    this.type = 'inline-button-callback';
    this.value = options.value;
  }

  /**
   * Callback entry point. Calls handler against response.
   */
  call() {
    const response = JSON.parse(this.value);
    UserFactory.fromUserKey(response.userKey).load().then((user) => {
      const handler = ResponseHandlerFactory.getHandler({ response, user });
      handler.call(() => {});
    });
  }
}
