import CaQueue from '../../queue/ca-queue';
import { loadUser } from '../../factories/user-factory';
import log from '../../log';

/**
 * Notify driver about order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-03
 * @extends checkNotNull
 * @version 1.1
 * @since 0.1.0
 */
export default class NotifyDriver {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Queue} options.queue - (optional) queue, {@link CaQueue} is used if not provided
   * @param {function()} options.successCallback - (optional) callback to be executed on success
   * @param {function(reason: string)} options.failCallback - (optional) callback to be executed
   * with reason of fail
   */
  constructor(options = {}) {
    this.queue = options.queue || new CaQueue();
    this.failCallback = options.failCallback || (() => {});
    this.successCallback = options.successCallback || (() => {});
    this.loadUser = options.loadUser || loadUser;
  }

  /**
   * Load driver, check params and notify when matched.
   * Keep in mind that geoFire is really simple library and it doesn't allow us to perform
   * complex queries. So we have to manually check driver properties in our code.
   *
   * @param {string} options.driverKey - user to notify (ignored if not a driver).
   * @param {number} options.distance - distance from driver to passenger (from geofire library)
   * @param {Order} options.order - order
   */
  call(driverKey, distance, order) {
    const fail = (reason) => {
      log.debug(`skip notifying ${driverKey} because ${reason}`);
      this.failCallback(reason);
      return;
    };

    if (order.state.status !== 'new') {
      fail('order is not new');
      return;
    }

    // if order was created more than 15 mins ago
    if ((new Date()).getTime() > (order.state.createdAt || 0) + 15 * 60 * 1000) {
      fail('order is stale');
      return;
    }

    if (order.isNotified(driverKey)) {
      fail('driver was already notified');
      return;
    }

    this.loadUser(driverKey).then((user) => {
      if (user.state.userType !== 'driver') {
        fail('userType is not \'driver\'');
        return;
      }

      if (user.state.muted) {
        fail('driver is muted');
        return;
      }

      if (user.state.vehicleType !== order.state.requestedVehicleType) {
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
        orderKey: order.orderKey,
        distance,
        from: order.state.passengerLocation,
        to: order.state.passengerDestination,
        price: order.state.price,
        passengerKey: order.state.passengerKey,
      };
      this.queue.create({ userKey: driverKey, arg, route: 'driver-order-new' }); // eslint-disable-line max-len

      order.markNotified(driverKey);
      order.save();
      this.successCallback();
    });
  }
}
