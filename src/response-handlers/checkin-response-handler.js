import ResponseHandler from './response-handler';
import GeoFire from 'geofire';
import firebaseDB from '../firebase-db';
import { loadUser } from '../factories/user-factory';
import { loadOrder } from '../factories/order-factory';
import log from '../log';
import NotifyDriver from './support/notify-driver';

/**
 * Notify drivers about orders on checkin.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-12-05
 * @version 1.1
 * @since 0.1.0
 */
export default class CheckinResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'checkin-response-handler' }, options));
    this.keyEntered = this.keyEntered.bind(this);
    this.notifyDriver = options.notifyDriver || new NotifyDriver();
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
   * Loads the driver and queries orders around (query is based on driver location).
   * Calls `onResult` when things are set up.
   * Important note: notification doesn't happen immediately! See `queryOrders` method.
   */
  call(onResult) {
    this.ensureInitialized();
    const r = this.response;

    loadUser(r.driverKey).then((driver) => {
      this.driver = driver;
      this.queryOrders();
      onResult();
    });
  }

  /**
   * Query nearby orders with geoFire and notify driver about them. Keep in mind that notification
   * is not executed immediately, we're awaiting results from geoFire, for every result we
   * execute notification method (`notifyDriver`). How long it will take?.. It completely
   * depends on geoFire. We should expect callbacks in a minute, hour, month, etc. or never.
   *
   * @private
   */
  queryOrders() {
    const q = this.geoFire.query({
      center: this.driver.state.location,
      radius: this.driver.state.radius * 1,
    });

    q.on('key_entered', this.keyEntered);
  }

  /**
   * Geofire key_entered callback.
   *
   * @private
   */
  keyEntered(orderKey, location, distance) {
    const userKey = this.driver.userKey;
    log.debug(`order found for driver ${userKey}: order key: ${orderKey}, location: ${location}, distance: ${distance}`); // eslint-disable-line max-len
    loadOrder(orderKey).then((order) => {
      this.notifyDriver.call(userKey, distance, order);
    });
  }
}
