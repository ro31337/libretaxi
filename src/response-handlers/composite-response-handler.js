import ResponseHandler from './response-handler';
import objectAssign from 'object-assign';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import ResponseHandlerFactory from '../factories/response-handler-factory';

/**
 * User state response handler.
 * Saves {@link UserStateResponse} `state` to {@link User} `state.`
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-16
 * @version 1.1
 * @since 0.1.0
 */
export default class CompositeResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link UserStateResponse} instance.
   * @param {Object} user - {@link User} instance.
   */
  constructor(options) {
    super(objectAssign({ type: 'composite-response-handler' }, options));
    this.user = options.user;
  }

  /**
   * Handler entry point.
   * Updates user's state and saves to storage. Calls `onResult` when saved.
   */
  call(onResult, index, v) {
    const i = index || 0;

    if (i >= this.response.responses.length) {
      onResult(v);
      return;
    }

    const user = this.user;
    const response = this.response.responses[i];
    const handler = ResponseHandlerFactory.getHandler({ response, user });
    handler.call((retVal) => {
      this.call(onResult, i + 1, retVal || v);
    });
  }
}
