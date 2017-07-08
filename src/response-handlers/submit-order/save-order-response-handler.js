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

/**
 * Save order response handler.
 * Creates {@link Order} entity based on {@link SubmitOrderResponse} properties.
 * Sets Order location with geofire package. Geofire updates Order object with
 * `g` and `l` properties. Rest of the properties are copied from {@link SubmitOrderResponse}.
 * `orderKey` is guid.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-09-13
 * @version 1.1
 * @since 0.1.0
 */
export default class SaveOrderResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'save-order-response-handler' }, options));
  }

  /**
   * Ensures that database connection is initialized.
   * @private
   */
  ensureInitialized() {
    if (this.geoFire) return;
    this.geoFire = new GeoFire(firebaseDB.config().ref('orders'));
  }

  /**
   * Handler entry point.
   * Creates order, updates order location, saves to storage.
   * Calls `onResult` when saved.
   */
  call(onResult) {
    this.ensureInitialized();
    const r = this.response;

    // 1. create new order
    new Order({ orderKey: r.order.orderKey }).load().then((order) => {
      // 2. save with geoFire
      this.geoFire.set(order.orderKey, r.order.passengerLocation).then(() => {
        // 3. assign properties from response and save
        Object.assign(order.state, r.order);
        order.state.status = 'new'; // eslint-disable-line no-param-reassign
        order.save(() => {
          // 4. update user `currentOrder` property
          this.user.state.currentOrderKey = order.orderKey;
          this.user.save(() => {
            onResult();
          });
        });
      })
      .catch((err) => {
        console.log(`Error in SaveOrderResponseHandler (geoFire): ${err}`); // eslint-disable-line no-console, max-len
        onResult();
      });
    })
    .catch((err) => {
      // no idea how to test it, untested code in this block
      console.log(`Error in SaveOrderResponseHandler (stateful): ${err}`); // eslint-disable-line no-console, max-len
    });
  }
}
