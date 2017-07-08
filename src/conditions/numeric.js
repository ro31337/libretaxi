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
 * Numeric Condition.
 * Checks if provided value is "numer-ish" and one of the following:
 * - number
 * - string number
 * - string number with spaces at the beginning or at the end
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-08
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Numeric extends Condition {
  constructor(value) {
    super({ type: 'numeric' });
    this.value = value;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if numeric, otherwise returns `false`.
   */
  call() {
    return /^\s*\d+\s*$/.test(this.value);
  }
}
