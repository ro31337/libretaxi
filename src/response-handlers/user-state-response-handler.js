import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

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
export default class UserStateResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link UserStateResponse} instance.
   * @param {Object} user - {@link User} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'user-state-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Updates user's state and saves to storage. Calls `onResult` when saved.
   */
  call(onResult) {
    this.user.setState(this.response.state);
    this.user.save(onResult);
  }
}
