import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null.js';
import ResponseHandlerFactory from '../../factories/response-handler-factory';
import EmptyResponse from '../../responses/empty-response';

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
   * @param {User} options.user - user
   */
  constructor(options) {
    super(options);
    this.type = 'inline-button-callback';
    this.value = options.value;
    this.user = options.user;
  }

  /**
   * Callback entry point. Calls handler against response.
   */
  call() {
    const response = ((this.user.state.inlineValues || {}).hash || {})[this.value] ||
      new EmptyResponse();
    const handler = ResponseHandlerFactory.getHandler({ response, user: this.user });
    handler.call(() => {});
  }
}
