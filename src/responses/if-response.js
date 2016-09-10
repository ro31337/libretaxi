import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Conditional response.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {Response}
 * @date 2016-09-09
 * @version 1.1
 * @since 0.1.0
 */
export default class IfResponse extends
  mix(Response).with(checkNotNull(['condition', 'ok'])) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Object} options.condition - instance of {@link Condition} class
   * @param {Response} options.ok - response to be called when condition truthy
   * @param {Response} options.err - (optional) response to be called when condition falsy
   * @example
   * const r = new IfResponse({
   *  condition: new Equals(2 + 2, 4),
   *  ok: new TextResponse('Universe is stable'),
   *  err: new TextResponse('Universe is highly unstable'),
   * });
   * @example
   * const r = new IfResponse({
   *  condition: new In(value, ['one', 'two', 'three']),
   *  ok: new TextResponse('You\'re good to go!'),
   * });
   * @example
   * const r = new IfResponse({
   *  condition: new AllSystemsAreGood(),
   *  ok: new TextResponse('You\'re good to go!'),
   * });
   */
  constructor(options) {
    const opts = Object.assign({ type: 'if' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
