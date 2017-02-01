import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Text response. Used to return response that contains message to the user.
 * This response has `type` property set to `text`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-04
 * @version 1.3
 * @since 0.1.0
 */
export default class TextResponse extends mix(Response).with(checkNotNull('message')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - Text message for the user. This parameter
   * is available as object property.
   * @param {boolean} options.important - (optional) When set to `true`, message won't be optimized
   * (for example, won't be concatenated with other messages)
   * @throws {ArgumentError} throw error when message parameter not specified.
   * @example
   * r = new TextResponse({ message: 'hello!' });
   * console.log(r.message); // prints "hello!"
   * console.log(r.type); // prints "text"
   */
  constructor(options) {
    const opts = Object.assign({ type: 'text' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
