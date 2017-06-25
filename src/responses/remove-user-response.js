import Response from './response';

/**
 * "Remove user" response. Used to remove user from the database.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2017-06-24
 * @version 1.1
 * @since 0.1.0
 */
export default class RemoveUserResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    super({ type: 'remove-user' });
  }
}
