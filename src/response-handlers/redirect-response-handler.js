import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Redirect response handler.
 * Saves {@link RedirectResponse} `path` to {@link User} `state.menuLocation`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-18
 * @version 1.1
 * @since 0.1.0
 */
export default class RedirectResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link RedirectResponse} instance.
   * @param {Object} user - {@link User} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'redirect-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Updates user's `state.menuLocation`. Calls `onResult` when saved.
   */
  call(onResult) {
    this.user.setState({ menuLocation: this.response.path });
    this.user.save(onResult);
  }
}
