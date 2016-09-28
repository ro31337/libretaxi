import CaQueue from './ca-queue';
import Queue from './queue';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * CLI "Call action" queue. Used to call menu actions in CLI environment only.
 * HACKY! Used for development/testing purposes only. With this type of queue it's
 * possible to run multiple instances of application and communicate between them.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-26
 * @extends {CaQueue}
 * @version 1.1
 * @since 0.1.0
 * @see https://github.com/ro31337/cheaptaxi/issues/259
 */
export default class CliCaQueue extends mix(CaQueue).with(checkNotNull('userKey')) {

  /**
   * Constructor.
   *
   * @param options - hash of options
   * @param options.userKey - user key of the current user.
   */
  constructor(options) {
    super(options);
    this.instanceType = `${this.type}-${options.userKey}`;
    this.instanceQueue = options.instanceQueue || new Queue({ type: this.instanceType });
    this.recreate = this.recreate.bind(this);
  }

  /**
   * Receives a message and recreates with another type. For example,
   * message `test` for user with key `cli_1` will be recreated as `test-cli_1`.
   * Sets a callback to process it's own messages only (see `userKey` parameter in constructor).
   *
   * @param {Function} callback - function to be executed for each queue message.
   */
  process(callback) {
    super.process(this.recreate);
    this.instanceQueue.process(callback);
  }

  /**
   * Callback that recreates message, but for instance type.
   *
   * @private
   */
  recreate(job, done) {
    const data = job.data;
    this.instanceQueue.create(data);
    done();
  }
}
