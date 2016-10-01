import ResponseHandler from '../response-handler';
import GeoFire from 'geofire';
import firebaseDB from '../../firebase-db';
import uuid from 'node-uuid';
import Order from '../../order';
import UserFactory from '../../factories/user-factory';
import log from '../../log';
import CaQueue from '../../queue/ca-queue';

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
export default class NotifyDriversResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'notify-drivers-response-handler' }, options));
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
   * Creates order, updates order location, saves to storage.
   * Calls `onResult` when saved.
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

  queryDrivers() {
    const q = this.geoFire.query({
      center: this.order.state.passengerLocation,
      radius: 20,
    });

    q.on('key_entered', (key, location, distance) => {
      log.debug(`user found: key: ${key}, location: ${location}, distance: ${distance}`);
      this.notifyDriver(key, distance);
    });
  }

  notifyDriver(driverKey, distance) {
    if (this.order.state.status !== 'new') {
      log.debug(`skip notifying driver ${driverKey} because order is not new`);
      return;
    }

    UserFactory.fromUserKey(driverKey).load().then((user) => {
      if (user.state.userType !== 'driver') {
        log.debug(`skip notifying driver ${driverKey} because userType is not 'driver'`);
        return;
      }

      if (user.state.muted) {
        log.debug(`skip notifying driver ${driverKey} because driver is muted`);
        return;
      }

      if (user.state.vehicleType !== this.order.state.requestedVehicleType) {
        log.debug(`skip notifying driver ${driverKey} because vehicle types don't match`);
        return;
      }

      // ignore if driver is busy
      if (user.state.menuLocation !== 'driver-index') {
        log.debug(`skip notifying driver ${driverKey} because driver is busy`);
        return;
      }

      // TODO: matched everything, notify!
      log.debug(`notifying ${driverKey} (distance ${distance}) about the order`);

      // driver-order-new
      const queue = new CaQueue();
      queue.create({ userKey: driverKey, arg: this.order.orderKey, route: 'driver-order-new' });
    });
  }
}
