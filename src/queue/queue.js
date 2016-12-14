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
   * Creates a message and enqueues with 1 second delay.
   *
   * @param {Object} options - hash of parameters
   */
  createDelayed(options) {
    this.queue
      .create(this.type, options)
      .delay(1000)
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
      .process(this.type, callback);
  }
}
