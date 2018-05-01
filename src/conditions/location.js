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
 * Location condition.
 * Accepts object. Returns true when object is array of two elements and elements are numbers.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-23
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Location extends Condition {

  /**
   * Constructor.
   *
   * @param {Object} value - value to check
   */
  constructor(value) {
    super({ type: 'location' });
    this.value = value;
  }

  /**
   * Entry point for condition.
   * Checks if value is array of 2 numbers (latitude and longitude) and these numbers satisfy
   * the following requirements:
   *
   * - latitude: range from -90.0 to 90.0
   * - longitude: range from -180.0 to 180.0
   *
   * @returns {boolean} result - `true` if value is valid location, `false` otherwise.
   */
  call() {
    return Array.isArray(this.value) &&
      this.value.length === 2 &&
      this.value[0] >= -90 && this.value[0] <= 90 &&
      this.value[1] >= -180 && this.value[1] <= 180;
  }
}
