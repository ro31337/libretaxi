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

import Response from '../response';
import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null';

/**
 * Save order response.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-09-13
 * @version 1.1
 * @since 0.1.0
 */
export default class SaveOrderResponse extends
  mix(Response).with(checkNotNull([
    'orderKey',
    'passengerKey',
    'passengerLocation',
    'passengerDestination',
    'price',
    'createdAt',
    'requestedVehicleType',
  ])) {
  /**
   * Constructor.
   *
   * @type {Object} order
   * @param {string} order.orderKey - order key, newly generated UUID v.4.
   * @param {string} order.passengerKey - passenger user key, for example: `cli_1`
   * @param {Array} order.passengerLocation - passenger location,
   * for example: `[37.421955, -122.084058]`
   * @param {string} order.passengerDestination - passenger destination
   * @param {string|number} order.price - order price set by the passenger
   * @param {object} order.createdAt - timestamp of when order has been created
   * (time since the Unix epoch, in milliseconds)
   * @see https://www.firebase.com/docs/web/api/servervalue/timestamp.html
   * @example
   * r = new SaveOrderResponse({
   *   passengerKey: 'cli_1',
   *   passengerLocation: [37.421955, -122.084058],
   *   passengerDestination: 'South San Francisco BART station',
   *   price: 100,
   *   createdAt: Firebase.database.ServerValue.TIMESTAMP,
   * });
   */
  constructor(order) {
    const opts = Object.assign({ type: 'save-order' }, order);
    super(opts);
    Object.assign(this, { type: 'save-order', order });
  }
}
