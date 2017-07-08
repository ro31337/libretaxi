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
