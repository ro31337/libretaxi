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
import Settings from '../../settings';

/**
 * Radius Condition.
 * Checks if provided value can be used as radius.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-10
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Radius extends Condition {
  constructor(value, settings) {
    super({ type: 'radius' });
    this.value = value;
    this.settings = settings || new Settings();
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if numeric, otherwise returns `false`.
   */
  call() {
    return /^\s*\d+\s*$/.test(this.value) &&
      this.value * 1 <= this.settings.MAX_RADIUS &&
      this.value * 1 > 0;
  }
}
