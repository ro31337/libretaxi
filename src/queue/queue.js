import kue from 'kue';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Base queue class. Implements facade-ish methods around `kue` library.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-28
 * @version 1.2
 * @extends checkNotNull
 * @abstract
 * @since 0.1.0
 */
export default class Queue extends mix(class {}).with(checkNotNull('type')) {

  /**
   * Constructor.
   *
   * @param {string} options.type - type of queue.
   */
  constructor(options) {
    super(options);
    this.type = options.type;
    this.queue = options.queue || kue.createQueue();
  }

  /**
   * Creates a message and enqueues.
   *
   * @param {Object} options - hash of parameters
   */
  create(options) {
    this.queue
      .create(this.type, options)
      .removeOnComplete(true)
      .save();
  }

  /**
   * Creates a message and enqueues with 1 second delay by default.
   *
   * @param {Object} options - hash of parameters
   * @param {Number} delay - (optional) delay in msec, 1000 msec by default.
   */
  createDelayed(options, delay = 1000) {
    this.queue
      .create(this.type, options)
      .delay(delay)
      .removeOnComplete(true)
      .save();
  }

  /**
   * Sets a callback to process messages.
   *
   * @param {Function} callback - function to be executed for each queue message.
   */
  process(callback) {
    this.queue
      .process(this.type, 20, callback);
  }
}
