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
 * Equals Condition.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-09
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Equals extends Condition {
  constructor(actual, expected) {
    super({ type: 'equals' });
    this.actual = actual;
    this.expected = expected;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if actual equals expected, otherwise
   * returns `false`.
   */
  call() {
    return this.actual === this.expected;
  }
}
