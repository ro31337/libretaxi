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
 * Update location response. Used to update user location.
 * This response has `type` property set to `update-location`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-05
 * @version 1.2
 * @since 0.1.0
 */
export default class UpdateLocationResponse extends
  mix(Response).with(checkNotNull('location')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.location - user's location, array with two decimal coordinates.
   * For example: `[37.421955, -122.084058]` (location of GooglePlex in MTV)
   * @throws {ArgumentError} throw error when message parameter(s) not specified.
   * @example
   * r = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
   * console.log(r.location); // prints "[37.421955, -122.084058]"
   */
  constructor(options) {
    super(Object.assign({ type: 'update-location' }, options));
    this.location = options.location;
  }
}
