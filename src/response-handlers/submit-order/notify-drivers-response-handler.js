import ResponseHandler from '../response-handler';
import GeoFire from 'geofire';
import firebaseDB from '../../firebase-db';
import Order from '../../order';
import UserFactory from '../../factories/user-factory';
import log from '../../log';
import CaQueue from '../../queue/ca-queue';

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
    this.queue = options.queue || new CaQueue();
    this.keyEntered = this.keyEntered.bind(this);
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

    UserFactory.fromUserKey(r.passengerKey).load().then((passenger) => {
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
      radius: 20,
    });

    q.on('key_entered', this.keyEntered);
  }

  /**
   * Geofire key_entered callback.
   *
   * @private
   */
  keyEntered(key, location, distance) {
    log.debug(`user found: key: ${key}, location: ${location}, distance: ${distance}`);
    this.notifyDriver(key, distance);
  }

  /**
   * Load driver, check params and notify when matched.
   * Keep in mind that geoFire is really simple library and it doesn't allow us to perform
   * complex queries. So we have to manually check driver properties in our code.
   *
   * @param {string} driverKey - driver user key
   * @param {number} distance - distance from driver to passenger (from geofire library)
   * @param {function(reason: string)} failCallback - callback to be executed with reason of fail
   * @param {function()} successCallback - callback to be executed on success
   * @private
   */
  notifyDriver(driverKey, distance, failCallback = () => {}, successCallback = () => {}) {
    const fail = (reason) => {
      log.debug(`skip notifying ${driverKey} because ${reason}`);
      failCallback(reason);
      return;
    };

    if (this.order.state.status !== 'new') {
      fail('order is not new');
      return;
    }

    UserFactory.fromUserKey(driverKey).load().then((user) => {
      if (user.state.userType !== 'driver') {
        fail('userType is not \'driver\'');
        return;
      }

      if (user.state.muted) {
        fail('driver is muted');
        return;
      }

      if (user.state.vehicleType !== this.order.state.requestedVehicleType) {
        fail('vehicle types don\'t match');
        return;
      }

      // ignore if driver is busy
      if (user.state.menuLocation !== 'driver-index') {
        fail('driver is busy');
        return;
      }

      // matched everything, notify!
      log.debug(`notifying ${driverKey} (distance ${distance}) about the order`);

      const arg = {
        orderKey: this.order.orderKey,
        distance,
        from: this.order.state.passengerLocation,
        to: this.order.state.passengerDestination,
        price: this.order.state.price,
        passengerKey: this.order.state.passengerKey,
      };
      this.queue.create({ userKey: driverKey, arg, route: 'driver-order-new' }); // eslint-disable-line max-len
      successCallback();
    });
  }
}
