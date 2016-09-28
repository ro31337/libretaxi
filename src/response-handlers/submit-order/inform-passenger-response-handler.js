import ResponseHandler from '../response-handler';
import CaQueue from '../../queue/ca-queue';

/**
 * Informs passenger that order has been submitted.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-09-15
 * @version 1.1
 * @since 0.1.0
 */
export default class InformPassengerResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link InformPassengerResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'inform-passenger-response-handler' }, options));
    this.queue = new CaQueue();
  }

  /**
   * Handler entry point. Informs passenger by posting redirect to `order-submitted` route.
   * Calls `onResult` when saved.
   */
  call(onResult) {
    this.queue.redirect({
      userKey: this.response.passengerKey,
      route: 'order-submitted',
    });
    onResult();
  }
}
