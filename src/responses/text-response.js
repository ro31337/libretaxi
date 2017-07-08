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
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Text response. Used to return response that contains message to the user.
 * This response has `type` property set to `text`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-04
 * @version 1.3
 * @since 0.1.0
 */
export default class TextResponse extends mix(Response).with(checkNotNull('message')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - Text message for the user. This parameter
   * is available as object property.
   * @param {boolean} options.important - (optional) When set to `true`, message won't be optimized
   * (for example, won't be concatenated with other messages)
   * @throws {ArgumentError} throw error when message parameter not specified.
   * @example
   * r = new TextResponse({ message: 'hello!' });
   * console.log(r.message); // prints "hello!"
   * console.log(r.type); // prints "text"
   */
  constructor(options) {
    const opts = Object.assign({ type: 'text' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
