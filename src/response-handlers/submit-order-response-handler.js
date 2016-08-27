import ResponseHandler from './response-handler';
import GeoFire from 'geofire';
import firebaseDB from '../firebase-db';
import uuid from 'node-uuid';
import Order from '../order';
import kue from 'kue';

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
export default class SubmitOrderResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link SubmitOrderResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'submit-order-response-handler' }, options));
    this.queue = options.queue || kue.createQueue();
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
    new Order({ orderKey: uuid.v4() }).load().then((order) => {
      // 2. save with geoFire
      this.geoFire.set(order.orderKey, r.order.passengerLocation).then(() => {
        // 3. assign properties from response and save
        Object.assign(order.state, r.order);
        order.save(() => {
          this.informPassenger(r.order.passengerKey);
          onResult();
        });
      })
      .catch((err) => {
        console.log(`Error in SubmitOrderResponseHandler (geoFire): ${err}`); // eslint-disable-line no-console, max-len
        onResult();
      });
    })
    .catch((err) => {
      // no idea how to test it, untested code in this block
      console.log(`Error in SubmitOrderResponseHandler (stateful): ${err}`); // eslint-disable-line no-console, max-len
    });
  }

  /**
   * @private
   */
  informPassenger(userKey) {
    // IMPORTANT!
    // Note `delay(1000)` below. Unfortunately, this delay is mandatory.
    // We need this delay because in `passenger/request-destination.js` we
    // have composite response that contains the following sequence:
    //
    // * UserStateResponse
    // * SubmitOrderResponse
    // * TextResponse({ message: '👌 OK!' }))
    // * RedirectResponse({ path: 'blank-screen' }));
    //
    // And we execute this code on the second step (SubmitOrderResponse).
    // Somehow we need to make sure that all next steps were done, before we
    // can go post to the queue request to call another action. Now it's done
    // with delay(1000), but it's definitely an area of improvement.

    this.queue.create('call-action', { userKey, route: 'order-submitted' })
      .delay(1000) // !!!
      .priority('high')
      .save();
  }
}
