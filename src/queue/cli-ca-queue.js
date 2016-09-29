import CaQueue from './ca-queue';
import Queue from './queue';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import kue from 'kue';

/**
 * CLI "Call action" queue. Used to call menu actions in CLI environment only.
 * HACKY! Used for development/testing purposes only. With this type of queue it's
 * possible to run multiple instances of application.
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
    // dependency injection for tests (instanceQueue and instanceKue)
    this.instanceQueue = options.instanceQueue || new Queue({ type: this.instanceType });
    this.instanceKue = options.instanceKue || kue.createQueue();
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
    const destinationType = `${this.type}-${data.userKey}`;

    // create every time, maybe not the best idea, but OK for development/tests
    this.instanceKue
      .create(destinationType, data)
      .save();

    // console.log(`job type: ${job.type}`);
    // console.log(`current instance type: ${this.instanceType}`);
    // console.log(`posting to ${destinationType}`);
    done();
  }
}
