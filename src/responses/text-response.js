import Response from './response';
import objectAssign from 'object-assign';
import { ArgumentError } from '../validations/errors';

/**
 * Text response. Used to return response that contains message to the user.
 * This response has `type` property set to `text`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-04
 * @version 1.1
 * @since 0.1.0
 */
export default class TextResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - Text message for the user. This parameter
   * is available as object property.
   * @throws {ArgumentError} throw error when message parameter not specified.
   * @example
   * r = new TextResponse({message: 'hello!'});
   * console.log(r.message); // prints "hello!"
   * console.log(r.type); // prints "text"
   */
  constructor(options) {
    const opts = objectAssign({ type: 'text' }, options);
    super(opts);

    if (!opts.message) {
      throw new ArgumentError('message parameter not specified');
    }

    objectAssign(this, opts);
  }
}
