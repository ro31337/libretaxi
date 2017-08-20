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
 * All (composite) condition.
 * Accepts the list of conditions, returns `true` if all of them are satisfied. Otherwise `false`.
 * If no conditions provided, returns `true`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-08-19
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class All extends Condition {
  constructor(...conditions) {
    super({ type: 'all' });
    this.conditions = conditions;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - `true` if all conditions are satisfied, `false` otherwise.
   */
  call() {
    for (const condition of this.conditions) {
      if (!condition.call()) return false;
    }
    return true;
  }
}
