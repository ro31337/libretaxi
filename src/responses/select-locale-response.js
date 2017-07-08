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

import UserStateResponse from './user-state-response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null';
/**
 * Select locale response. Used to return response that contains
 * locale (`en`, `ru`, etc..) that should be stored in user state.
 * This response inherits `type` property of `user-state` from
 * {@link UserStateResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {UserStateResponse}
 * @date 2016-06-17
 * @version 1.2
 * @since 0.1.0
 */
export default class SelectLocaleResponse extends
  mix(UserStateResponse).with(checkNotNull('locale')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} locale - Two-letter lower-cased locale (`en`, `ru`, etc.)
   * @throws {ArgumentError} throw error when locale not specified
   * @example
   * r = new SelectLocaleResponse({ locale: 'en' });
   * console.log(r.locale); // prints "en"
   * console.log(r.type); // prints "user-state"
   */
  constructor(options) {
    super(options);
    Object.assign(this, options);
  }
}
