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
import routes from './../routes';

/**
 * Redirect response.
 * Response is used to redirect the user to new menu location. Is a subtype
 * of {@link Response} with type 'redirect' (see {@link SupportedResponseTypes}).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-10
 * @version 1.1
 * @since 0.1.0
 */
export default class RedirectResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.path - pre-defined key from {@link Routes}.
   * @throws {ArgumentError} thrown when path invalid or not specified.
   * @example
   * return new RedirectResponse({ path: 'select-locale' });
   */
  constructor(options) {
    const opts = Object.assign({ type: 'redirect' }, options);
    super(opts);

    if (!opts.path) {
      throw new ArgumentError('path parameter not specified');
    }

    if (!routes[opts.path]) {
      throw new ArgumentError('path not found');
    }

    Object.assign(this, opts);
  }
}
