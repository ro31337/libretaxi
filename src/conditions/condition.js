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

import checkNotNull from '../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * Condition.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-09
 * @extends checkNotNull
 * @abstract
 * @version 1.1
 * @since 0.1.0
 */
export default class Condition extends mix(class {}).with(checkNotNull('type')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Condition type, for example: `if`
   */
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if condition is truthy, or false if falsy.
   */
  call() {
    throw new Error('not implemented');
  }
}
