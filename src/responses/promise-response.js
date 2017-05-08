import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Promise response. Used to execute a promise and perform an action based on result. Can be
 * useful when {@link Action} result cannot be calculated synchronously. Why this response and
 * handler required when you can just use `new Promise`? Because actions should return only one
 * type - {@link Response}. And each response can be handled the different way for the platform
 * like Telegram, CLI. However, some responses are the same for all platforms (like this one).
 * So responses are used to describe behavior, not to implement behavior. Behavior is implemented
 * in response handlers.
 *
 * Also, promise response can be useful when described behavior depends on user input and this
 * input can't be calculated synchronously. For example, {@link ParsedLocation} is synchronous
 * operation, but address lookup is asynchronous, so it can't be used directly in behavior tree,
 * because we want to avoid implementing behavior in responses.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {Response}
 * @date 2017-05-06
 * @version 1.1
 * @since 0.1.0
 */
export default class PromiseResponse extends
  mix(Response).with(checkNotNull(['promise', 'cb'])) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Promise} options.promise - promise to be executed
   * @param {Function} options.cb - resolve callback, to be called when promise resolved.
   * This callback called with parameter returned from resolved promise.
   * @example
   * const r = new PromiseResponse({
   *  promise: new Promise((resolve) => { resolve('foo') }),
   *  cb: (result) => { console.log(`resolved with ${result}`) },
   * });
   * // example above will print "resolved with foo"
   */
  constructor(options) {
    const opts = Object.assign({ type: 'promise' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
