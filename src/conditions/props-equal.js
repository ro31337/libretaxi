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

import Condition from './condition';

/**
 * Props Equal condition. Compare props from fragment hash to master hash. Doesn't perform deep
 * comparison.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-17
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class PropsEqual extends Condition {

  /**
   * Constructor.
   *
   * @param {Object} fragment - expected fragment to compare to master (hash of props)
   * @param {Object} master - actual master hash of props
   * @returns {boolean} result - returns `true` if actual equals expected, otherwise
   * returns `false`.
   */
  constructor(fragment, master) {
    super({ type: 'props-equal' });
    this.fragment = fragment;
    this.master = master;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if all props from the `fragment` are equal to
   * the same props in `master` (master can contain more props). Otherwise `false`.
   */
  call() {
    for (const k of Object.keys(this.fragment)) {
      if (this.fragment[k] !== this.master[k]) {
        return false;
      }
    }
    return true;
  }
}
