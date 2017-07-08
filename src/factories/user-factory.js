/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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

/**
 * @typedef loadUser
 *
 * Creates concrete `User` instance based on `userKey`.
 *
 * @param {string} userKey - user key
 * @return {Promise} promise - promise that resolves with `user` when user data loaded.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-30
 * @version 1.1
 * @since 0.1.0
 */
let loadUser = (userKey) => { // eslint-disable-line import/no-mutable-exports, arrow-body-style
  return UserFactory.fromUserKey(userKey).load();
};

/**
 * @typedef mockLoadUser
 *
 * Mock `loadUser` method. Useful for tests.
 *
 * @param {function} mock - new `loadUser` method
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-30
 * @version 1.1
 * @since 0.1.0
 */
const mockLoadUser = (mock) => {
  loadUser = mock;
};

export { loadUser, mockLoadUser };
