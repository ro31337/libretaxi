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

import importedGetGeocoder from 'node-geocoder';
import Action from '../../action';
import PromiseResponse from '../../responses/promise-response';
import CompositeResponse from '../../responses/composite-response';
import MapResponse from '../../responses/map-response';
import Settings from '../../../settings';

/**
 * Lookup address action decorator.
 * Lookup address and call origin with array of latitude and longitude, for example:
 * [37.421955, -122.084058]
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-05-06
 * @abstract
 * @extends Action
 * @version 1.1
 * @since 0.1.0
 */
export default class LookupAddress extends Action {
  /**
   * Constructor.
   *
   * @param {Object} options - action options.
   * @param {Action} origin - origin action.
   */
  constructor(options, origin, settings, getGeocoder) {
    super(Object.assign({ type: origin.type }, options));
    this.origin = origin;
    this.settings = settings || new Settings();
    this.getGeocoder = getGeocoder || importedGetGeocoder;
  }

  /**
   * This method is not decorated.
   */
  get() {
    return this.origin.get();
  }

  /**
   * Lookup address and call origin with array of coordinates. For example:
   * [37.421955, -122.084058]
   */
  post(address) {
    if (typeof address === 'string') {
      // callback, to be executed after asynchronous operation
      const cb = (result) => {
        if (result === address) {
          // no action was performed, address is the same, just call origin
          return this.origin.post(result);
        }
        // address was resolved, add map response so user can see how this address was resolved
        return new CompositeResponse()
          .add(new MapResponse({ location: result }))
          .add(this.origin.post(result));
      };
      // response that represents asynchronous operation
      return new PromiseResponse({
        promise: this.promise(address),
        cb: cb.bind(this),
      });
    }
    return this.origin.post(address);
  }

  /**
   * Promise for promise response. Resolves with provided `address` if lookup is unsuccessful
   * or with array of coordinates if lookup was successful. Never explicitly rejects.
   * @param {String} address - street address
   * @private
   */
  promise(address) {
    return new Promise((resolve) => {
      // see https://github.com/nchaulet/node-geocoder for settings
      const geocoder = this.getGeocoder({
        provider: 'google',
        httpAdapter: 'https',
        apiKey: this.settings.GEOCODING_API_KEY,
        formatter: null,
      });

      geocoder.geocode(address, (err, res) => {
        if (err || !res || !res[0] || !res[0].latitude || !res[0].longitude) {
          resolve(address);
          return;
        }
        resolve([res[0].latitude, res[0].longitude]);
      });
    });
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
