import User from '../user';

/**
 * User factory, implements factory method(s) to create users based on
 * provided userKey.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-19
 * @version 1.1
 * @since 0.1.0
 */
export default class UserFactory {
  /**
   * Creates concrete `User` instance based on `userKey`. Note: this method
   * doesn't execute `load()` function. You have to execute it before you can
   * do `save`, `delete`, etc. See {@link Stateful} and {@link User}.
   *
   * @param {string} userKey - userKey, for example: `cli_1` or `telegram_31337`
   * @return {Object} Instance of `User`
   * @throws {Error} when `userKey` not specified
   */
  static fromUserKey(userKey) {
    if (!userKey) {
      throw new Error('userKey not specified');
    }

    const ss = userKey.split('_');
    return new User({ platformType: ss[0], platformId: ss[1] });
  }
}
