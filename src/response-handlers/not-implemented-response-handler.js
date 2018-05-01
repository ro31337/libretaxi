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

import ResponseHandler from './response-handler';

/**
 * Not implemented response handler. Stub for not implemented response handlers.
 * Throws error on `call`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-17
 * @version 1.1
 * @since 0.1.0
 */
export default class NotImplementedResponseHandler extends ResponseHandler {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'not-implemented-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Throws `not implemented` exception.
   */
  call() {
    throw new Error('not implemented');
  }
}
