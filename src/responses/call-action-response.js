import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Call action response. Command to call action by route for specific user with or without
 * argument(s).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-10-21
 * @version 1.1
 * @since 0.1.0
 */
export default class CallActionResponse extends
  mix(Response).with(checkNotNull(['userKey', 'route'])) {
  /**
   * Constructor.
   *
   * @param {object} options - hash of parameters
   * @param {string} options.userKey - action will be called for this user
   * @param {string} options.route - action route, see {@link Routes}
   * @param {object|string} options.arg - (optional) argument(s) for action
   * @param {object} options.kicker - (optional) expected user state properties and their values
   * before calling the action. When specified, action is called only if kicker props equal
   * to `user.state` props.
   */
  constructor(options) {
    super(Object.assign({ type: 'call-action' }, options));
    Object.assign(this, options);
  }
}
