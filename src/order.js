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

import stateful from './stateful';
import { mix } from 'mixwith';
import checkNotNull from './validations/check-not-null';

/**
 * Order.
 * Represents passenger's order. Will keep the following information:
 * - order key (guid)
 * - passenger location
 * - passenger destination
 * - passenger key
 * - price
 * - driver key
 * - createdAt
 * - acceptedAt
 * - notified
 * and so on...
 * ...plus geo position (to be set with geoFire package).
 *
 * Drivers are subscribed to new orders in their area.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Stateful}
 * @extends {checkNotNull}
 * @date 2016-08-13
 * @version 1.1
 * @since 0.1.0
 */
export default class Order extends
  mix(stateful()).with(checkNotNull('orderKey')) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.orderKey - Order identifier (guid).
   */
  constructor(options) {
    super(options);
    Object.assign(this, options);

    this.stateful = {
      key: this.orderKey,
      table: 'orders',
    };
  }

  /**
   * Add user to notified list. Note: you probably want to `.save()` these changes.
   *
   * @param {String} userKey - user key to add to notified list
   */
  markNotified(userKey) {
    if (!this.state.notified) { this.setState({ notified: [] }); }
    this.state.notified.push(userKey);
  }

  /**
   * Check if the user is in notified list for this order.
   *
   * @param {String} userKey - user key to check
   * @return {boolean} result - true if user was already notified, otherwise false
   */
  isNotified(userKey) {
    return ((this.state || {}).notified || []).includes(userKey);
  }
}
