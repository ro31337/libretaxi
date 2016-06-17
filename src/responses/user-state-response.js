import Response from './response';
import objectAssign from 'object-assign';

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
   * @type {Object}
   * @example
   * r = new UserStateResponse({phone: '555-111-22-33'});
   * console.log(r.type); // prints "user-state"
   * console.log(r.phone); // prints "555-111-22-33"
   */
  constructor(options) {
    const opts = objectAssign({ type: 'user-state' }, options);
    super(opts);
    objectAssign(this, opts);
  }
}
