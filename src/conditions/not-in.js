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
 * Not In Condition.
 * Accepts value and array. Returns true if array doesn't include value.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-11
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class NotIn extends Condition {
  constructor(value, arr) {
    super({ type: 'not-in' });
    this.value = value;
    this.arr = arr;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - `true` if array doesn't include value, `false` otherwise.
   */
  call() {
    return !this.arr.includes(this.value);
  }
}
