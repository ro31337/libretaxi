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

import routes from '../routes';
import initLocale from '../support/init-locale';

/**
 * Action factory, implements factory method(s) to create actions based on
 * provided key. See source code for the list of keys and corresponding
 * actions.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-26
 * @version 1.1
 * @since 0.1.0
 */
export default class ActionFactory {
  /**
   * Creates concrete `Action` instance based on menu location.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-26
   * @version 1.1
   * @since 0.1.0
   * @param {User} user - {@link User} instance. Action is created
   * based on the following variables:
   *  - `user.state.menuLocation` (optional) - menu location
   *  - `user.state.locale` (optional) - locale (`en`, `ru`, etc.)
   * @return {Object} Instance of `Action`
   */
  static fromMenuLocation(user) {
    const route = user.state.menuLocation || 'default';
    return this.fromRoute({ user, route });
  }

  /**
   * Creates concrete `Action` instance based on route.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-08-21
   * @version 1.1
   * @since 0.1.0
   * @param {Object} obj - hash of parameters
   * @param {User} obj.user - {@link User} instance.
   * @param {string} obj.route - route key from {@link Routes}.
   * @return {Object} Instance of `Action`
   */
  static fromRoute(obj) {
    const user = obj.user;
    const route = obj.route;
    const builder = routes[route];

    if (!builder) {
      throw new Error(`Can't find route key "${route}" in routes`);
    }

    return builder({ i18n: initLocale(user), user }); // eslint-disable-line new-cap
  }
}
