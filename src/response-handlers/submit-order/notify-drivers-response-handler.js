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

import ResponseHandler from '../response-handler';
import GeoFire from 'geofire';
import firebaseDB from '../../firebase-db';
import Order from '../../order';
import { loadUser } from '../../factories/user-factory';
import log from '../../log';
import NotifyDriver from '../support/notify-driver';
import Settings from '../../../settings';

/**
 * Notify drivers about newly created order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-10-01
 * @version 1.1
 * @since 0.1.0
 */
export default class NotifyDriversResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'notify-drivers-response-handler' }, options));
    this.keyEntered = this.keyEntered.bind(this);
    this.notifyDriver = options.notifyDriver || new NotifyDriver();
    this.settings = options.settings || new Settings();
  }

  /**
   * Ensures that database connection is initialized.
   * @private
   */
  ensureInitialized() {
    if (this.geoFire) return;
    this.geoFire = new GeoFire(firebaseDB.config().ref('users'));
  }

  /**
   * Handler entry point.
   * Loads existing order and queries drivers around (query is based on order properties).
   * Calls `onResult` when things are set up.
   * Important note: notification doesn't happen immediately! See `queryDrivers` method.
   */
  call(onResult) {
    this.ensureInitialized();
    const r = this.response;

    loadUser(r.passengerKey).then((passenger) => {
      const orderKey = passenger.state.currentOrderKey;
      new Order({ orderKey }).load().then((order) => {
        this.order = order;
        // query drivers
        this.queryDrivers();
        // and return immediately, the rest of the magic will happen asynchronously in this class
        onResult();
      });
    });
  }

  /**
   * Query nearby drivers with geoFire and notify them. Keep in mind that notification
   * is not executed immediately, we're awaiting results from geoFire, for every result we
   * execute notification method (`notifyDriver`). How long it will take?.. It completely
   * depends on geoFire. We should expect callbacks in a minute, hour, month, etc. or never.
   *
   * @private
   */
  queryDrivers() {
    const q = this.geoFire.query({
      center: this.order.state.passengerLocation,
      radius: this.settings.MAX_RADIUS * 1,
    });

    q.on('key_entered', this.keyEntered);
  }

  /**
   * Geofire key_entered callback.
   *
   * @private
   */
  keyEntered(userKey, location, distance) {
    log.debug(`user found: key: ${userKey}, location: ${location}, distance: ${distance}`);
    this.notifyDriver.call(userKey, distance, this.order);
  }
}
