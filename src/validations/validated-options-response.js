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

import { ArgumentError } from './errors';
import { Mixin } from 'mixwith';

/**
 * @typedef ValidatedOptionsResponse
 *
 * Validator for {@link OptionsResponse}.
 * Validates if params contains `rows`, if `rows` is array, and if each row
 * is array containing the list of objects with params `label` and `value`.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-04
 * @version 1.3
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.rows - Array of rows of options. Where each row is
   * array of objects. Each object must contain two properties: `label` and `value`.
   * @throws {ArgumentError} throw error when `rows` parameter not specified
   * @throws {TypeError} throw error `rows` parameter is not array
   * @throws {TypeError} throw error when individual row is not array
   * @throws {TypeError} throw error when individual row item is not object
   */
  constructor(options) {
    super(options);

    if (!(options.rows instanceof Array)) {
      throw new TypeError('rows parameter is expected to be an array');
    }

    for (let i = 0; i < options.rows.length; i++) {
      const row = options.rows[i];
      if (!(row instanceof Array)) {
        throw new TypeError('row is expected to be an array');
      }
      for (let j = 0; j < row.length; j++) {
        const item = row[j];
        if (!(item instanceof Object)) {
          throw new TypeError('row item is expected to be an object');
        }
        if (!item.label) {
          throw new ArgumentError('row item is expected to have \'label\' property');
        }
        if (!item.value) {
          throw new ArgumentError('row item is expected to have \'value\' property');
        }
      }
    }
  }
});
