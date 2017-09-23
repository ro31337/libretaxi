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

import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import If from '../../../responses/if-response';
import All from '../../../conditions/all';
import Location from '../../../conditions/location';
import Equals from '../../../conditions/equals';
import Around from '../../../conditions/around';
import Text from '../../../responses/text-response';

const PANJIM_GOA = [15.4909, 73.8278];

/**
 * Parsed Location action decorator.
 * Parse string location and call origin with array of latitude and longitude, for example:
 * [37.421955, -122.084058]
 * This decorator has no location sanity validation. For example, latitude '123' will be "valid" and
 * provided to the origin.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-09-22
 * @abstract
 * @extends Action
 * @version 1.1
 * @since 0.1.0
 */
export default class GoaInfo extends Action {
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
    return new CompositeResponse()
      .add(new If({
        condition: new All(
          new Equals(this.user.state.locale, 'ru'),
          new Location(location),
          new Around(location, PANJIM_GOA, 100),
        ),
        ok: new Text({ message: 'http://telegra.ph/Voditel-v-Goa-Prochti-08-12' }),
      }))
      .add(this.origin.post(location));
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
