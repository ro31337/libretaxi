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

import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Response handler (abstract class).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-11
 * @abstract
 * @extends checkNotNull
 * @version 1.1
 * @since 0.1.0
 */
export default class ResponseHandler extends mix(class {})
  .with(checkNotNull(['response', 'type'])) {
  /**
   * Constructor.
   *
   * @param {Response} options.response - instance of {@link Response}, related
   * to this handler.
   * @param {string} options.type - unique type of response handler. For example:
   * `cli-options-response-handler`. Used in unit testing.
   */
  constructor(options) {
    super(options);
    this.response = options.response;
    this.type = options.type;
    this.user = options.user;
    this.api = options.api;
  }

  /**
   * Entry point for the actual response handling.
   *
   * @param {function} onResult - callback that can be called by `call`
   * method when results are ready.
   */
  call(onResult) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }
}
