import ResponseHandler from './response-handler';
import firebaseDB from '../firebase-db';

/**
 * Remove user response handler. Removes user from the database.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2017-06-24
 * @version 1.1
 * @since 0.1.0
 */
export default class RemoveUserResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'remove-user-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Removes user from the database.
   */
  call(onResult) {
    if (!this.user) {
      onResult();
      return;
    }

    const usersDB = firebaseDB.config().ref('users');
    usersDB.child(this.user.userKey).remove(onResult);
  }
}
