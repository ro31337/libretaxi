import Action from '../../action';
import UserStateResponse from '../../responses/user-state-response';

/**
 * Update user identity.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-28
 * @version 1.1
 * @since 0.1.0
 */
export default class UpdateIdentity extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'update-identity' }, options));
  }

  /**
   * Update identity, save `first`, `last`, `username` to `user.state.identity`.
   *
   * @param {Object} args - hash of parameters
   * @param {string} args.first - first name
   * @param {string} args.last - last name
   * @param {string} args.username - platform username (for example, `@ro31337` for Telegram)
   * @return {UserStateResponse} - response to update state
   */
  call(args) {
    return new UserStateResponse({
      identity: {
        first: args.first,
        last: args.last,
        username: args.username,
      },
    });
  }
}
