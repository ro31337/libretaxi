import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import GeoFire from 'geofire';
import firebaseDB from '../firebase-db';

/**
 * Update location response handler.
 * Saves {@link UpdateLocationResponse} `location` to {@link User} object
 * with geofire package. Geofire updates the object with `g` and `l` properties.
 * For more information see here: https://github.com/ro31337/cheaptaxi/issues/159
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-05
 * @version 1.1
 * @since 0.1.0
 * @see https://github.com/ro31337/cheaptaxi/issues/159
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
    this.geoFire = new GeoFire(firebaseDB.ref('users'));
  }

  /**
   * Handler entry point.
   * Updates user's location and saves to storage. Calls `onResult` when saved.
   */
  call(onResult) {
    this.geoFire.set(this.user.userKey, this.response.location).then(() => {
      onResult();
    })
    .catch((err) => {
      console.log(`Error in UpdateLocationResponseHandler: ${err}`); // eslint-disable-line no-console, max-len
      onResult();
    });
  }
}
