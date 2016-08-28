import kue from 'kue';

let queue = kue.createQueue();

/**
 * Kue facade. Implements static methods around `kue` library.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-28
 * @version 1.1
 * @since 0.1.0
 */
export default class QueueFacade {

  /**
   * Posts a message to the queue to call action.
   *
   * @param {Object} options - hash of parameters
   * @param {string} options.userKey - represents the user for whom action should be executed.
   * @param {Object} options.arg - single argument (string or object) to be passed to action.
   * @param {string} options.route - route for this action, see {@link Routes} for full list.
   */
  static callAction(options) {
    queue.create('call-action', options)
      .priority('high')
      .save();
  }

  /**
   * Posts a message to the queue to call action with delay.
   *
   * Note `delay(1000)` below. Unfortunately, this delay is mandatory.
   * We need this delay because in `passenger/request-destination.js` we
   * have composite response that contains the following sequence:
   *
   * - UserStateResponse
   * - SubmitOrderResponse
   * - TextResponse({ message: '👌 OK!' }))
   * - RedirectResponse({ path: 'blank-screen' }));
   *
   * And we execute this code on the second step (SubmitOrderResponse).
   * Somehow we need to make sure that all next steps were done, before we
   * can go post to the queue request to call another action. Now it's done
   * with delay(1000), but it's definitely an area of improvement.
   *
   * @param {Object} options - hash of parameters
   * @param {string} options.userKey - represents the user for whom action should be executed.
   * @param {Object} options.arg - single argument (string or object) to be passed to action.
   * @param {string} options.route - route for this action, see {@link Routes} for full list.
   */
  static callActionWithDelay(options) {
    queue.create('call-action', options)
      .delay(1000) // !!!
      .priority('high')
      .save();
  }

  /**
   * Sets up a callback to process all `call-action` messages.
   *
   * @param {Function} callback - function to be executed for each queue message.
   */
  static processCallAction(callback) {
    queue.process('call-action', callback);
  }

  /**
   * Sets `queue` variable. Useful for testing only.
   *
   * @private
   * @param {Object} q - instance of queue
   */
  static setQueue(q) {
    queue = q;
  }
}
