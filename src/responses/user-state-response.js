import Response from './response';

/**
 * User state response. Used to update user's state with new values.
 * While updating unspecified keys remain untouched. Specified keys are
 * updated.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-06-16
 * @version 1.1
 * @since 0.1.0
 */
export default class UserStateResponse extends Response {
  /**
   * Constructor.
   *
   * @param {object} state - Object with modified state properties
   * @example
   * r = new UserStateResponse({phone: '555-111-22-33'});
   * console.log(r.type); // prints "user-state"
   * console.log(r.state.phone); // prints "555-111-22-33"
   */
  constructor(state) {
    const opts = { type: 'user-state', state };
    super(opts);
    Object.assign(this, opts);
  }
}
