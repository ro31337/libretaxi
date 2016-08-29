import ResponseHandler from './response-handler';
import Order from '../order';
import queue from '../queue-facade';

/**
 * Submit order response handler.
 * Creates {@link Order} entity based on {@link SubmitOrderResponse} properties.
 * Sets Order location with geofire package. Geofire updates Order object with
 * `g` and `l` properties. Rest of the properties are copied from {@link SubmitOrderResponse}.
 * `orderKey` is guid.
 *
 * Drivers are subscribed to orders in their area. So when new order within
 * specific area is created, drivers in this area immediately get notified.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-18
 * @version 1.1
 * @since 0.1.0
 */
export default class CancelCurrentOrderResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'cancel-current-order-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Updates order status to `cancelled` if it's not cancelled. If it's already
   * cancelled, does nothing. Always calls `onResult`.
   */
  call(onResult) {
    const orderKey = this.user.state.currentOrderKey;
    new Order({ orderKey }).load().then((order) => {
      if (order.status !== 'cancelled') {
        order.setState({ status: 'cancelled' });
        order.save(() => {
          this.informPassenger(this.user.userKey);
          // TODO: inform drivers who were notified already
          // this.informDrivers(...);
          onResult();
        });
      } else {
        onResult();
      }
    })
    .catch((err) => {
      // no idea how to test it, untested code in this block
      console.log(`Error in CancelCurrentOrderResponseHandler ${err}`); // eslint-disable-line no-console, max-len
    });
  }

  /**
   * @private
   */
  informPassenger(userKey) {
    queue.redirectToAction({ userKey, route: 'order-cancelled' });
  }
}
