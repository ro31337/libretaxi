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

import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import GeoFire from 'geofire';
import firebaseDB from '../firebase-db';
import Firebase from 'firebase';

/**
 * Update location response handler.
 * Saves {@link UpdateLocationResponse} `location` to {@link User} object
 * with geofire package. Geofire updates the object with `g` and `l` properties.
 * For more information see here: https://github.com/ro31337/libretaxi/issues/159
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-05
 * @version 1.1
 * @since 0.1.0
 * @see https://github.com/ro31337/libretaxi/issues/159
 */
export default class UpdateLocationResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link UserStateResponse} instance.
   * @param {Object} user - {@link User} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'update-location-response-handler' }, options));
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
   * Updates user's location and saves to storage. Calls `onResult` when saved.
   */
  call(onResult) {
    this.ensureInitialized();
    this.user.setState({ locationUpdatedAt: Firebase.database.ServerValue.TIMESTAMP });
    this.user.save(() => {
      this.geoFire.set(this.user.userKey, this.response.location).then(() => {
        onResult();
      })
      .catch((err) => {
        console.log(`Error in UpdateLocationResponseHandler: ${err}`); // eslint-disable-line no-console, max-len
        onResult();
      });
    });
  }
}
