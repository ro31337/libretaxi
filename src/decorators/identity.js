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

/**
 * User identity.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-29
 * @version 1.1
 * @since 0.1.0
 */
export default class Identity {

  /**
   * Constructor.
   *
   * @param {string} origin - origin string (for example: `Driver`), also used as fallback string
   * if no identity params provided
   * @param {object} identity - identity hash
   * @param {string} identity.first - first name
   * @param {string} identity.last - last name
   * @param {string} identity.username - platform username
   */
  constructor(origin, identity) {
    this.origin = origin;
    this.identity = identity;
  }

  /**
   * Decorate origin with identity props.
   *
   * @override
   * @return {string} - decorated string
   */
  toString() {
    const arr = [];
    const id = this.identity || {};
    if (id.first) {
      arr.push(id.first);
    }
    if (id.last) {
      arr.push(id.last);
    }
    if (id.username) {
      arr.push(`@${id.username}`);
    }
    if (arr.length > 0) {
      return `${this.origin} (${arr.join(' ')})`;
    }
    return this.origin;
  }
}
