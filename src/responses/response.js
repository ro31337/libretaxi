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

/* eslint-disable no-useless-constructor */
import ValidatedResponse from '../validations/validated-response';
import checkNotNull from '../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * Response to request. Supposed to be returned from the `Action` every
 * time user makes request.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedResponse}
 * @abstract
 * @date 2016-05-04
 * @version 1.1
 * @since 0.1.0
 */
export default class Response extends mix(class {}).with(checkNotNull('type'), ValidatedResponse) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   */
  constructor(options) {
    super(options);
    this.type = options.type;
  }
}
