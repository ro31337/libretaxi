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

import Response from './response';
import { ArgumentError } from '../validations/errors';

/**
 * Error response. Used to send error messages to the user. For example,
 * can be used for validation messages.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-06-08
 * @version 1.1
 * @since 0.1.0
 */
export default class ErrorResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - Error message
   * @throws {ArgumentError} thrown when message not specified
   * @example
   * return new ErrorResponse('Number is expected');
   */
  constructor(options) {
    const opts = Object.assign({ type: 'error' }, options);
    super(opts);

    if (!opts.message) {
      throw new ArgumentError('message parameter not specified');
    }

    Object.assign(this, opts);
  }
}
