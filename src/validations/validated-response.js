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
import SupportedResponseTypes from './supported-response-types';
import { Mixin } from 'mixwith';

/**
 * @typedef ValidatedResponse
 *
 * Validator for {@link Response}.
 * It validates constructor parameters only and has no other behavior.
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
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   * @throws {ArgumentError} throw error when `options.type` is not supported.
   * See {@link SupportedResponseTypes}.
   */
  constructor(options) {
    super(options);
    if (!SupportedResponseTypes.has(options.type)) {
      throw new ArgumentError(`response with type "${options.type}" not supported`);
    }
  }
});
