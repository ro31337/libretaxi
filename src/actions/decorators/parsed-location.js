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

import Action from '../../action';
import CompositeResponse from '../../responses/composite-response';
import MapResponse from '../../responses/map-response';

/**
 * Parsed Location action decorator.
 * Parse string location and call origin with array of latitude and longitude, for example:
 * [37.421955, -122.084058]
 * This decorator has no location sanity validation. For example, latitude '123' will be "valid" and
 * provided to the origin.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-03-25
 * @abstract
 * @extends Action
 * @version 1.2
 * @since 0.1.0
 */
export default class ParsedLocation extends Action {
  /**
   * Constructor.
   *
   * @param {Object} options - action options.
   * @param {Action} origin - origin action.
   */
  constructor(options, origin) {
    super(Object.assign({ type: origin.type }, options));
    this.origin = origin;
  }

  /**
   * This method is not decorated.
   */
  get() {
    return this.origin.get();
  }

  /**
   * Parse stringified location and call origin with array of coordinates. For example:
   * [37.421955, -122.084058]
   */
  post(location) {
    if (typeof location === 'string') {
      const pattern = /^\s*(-?\d{1,3}(\.\d{1,20})?)\s*,\s*(-?\d{1,3}(\.\d{1,20})?)\s*$/;
      const match = new RegExp(pattern).exec(location);
      if (match) {
        const [, lat,, lng] = match;
        const result = [lat * 1, lng * 1];
        return new CompositeResponse()
          .add(new MapResponse({ location: result }))
          .add(this.origin.post(result));
      }
    }
    return this.origin.post(location);
  }

  /**
   * This method is not decorated, but re-implemented here. Unfortunately, there is no method
   * overloading in ES6, so this is definitely area of improvement. TODO: later we can remove
   * unnecessary get method for action and use `call` always.
   */
  call(arg) {
    if (arg) {
      return this.post(arg);
    }
    return this.origin.get();
  }

  /**
   * This method is not decorated.
   */
  t(...args) {
    return this.origin.t(...args);
  }

  /**
   * This method is not decorated.
   */
  gt(...args) {
    return this.origin.gt(...args);
  }
}
