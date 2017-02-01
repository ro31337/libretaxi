import Response from './response';
import { ArgumentError } from '../validations/errors';

/**
 * Error response. Used to send error messages to the user. For example,
 * can be used for validation messages.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-06-08
 * @version 1.1
 * @since 0.1.0
 */
export default class ErrorResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - Error message
   * @throws {ArgumentError} thrown when message not specified
   * @example
   * return new ErrorResponse('Number is expected');
   */
  constructor(options) {
    const opts = Object.assign({ type: 'error' }, options);
    super(opts);

    if (!opts.message) {
      throw new ArgumentError('message parameter not specified');
    }

    Object.assign(this, opts);
  }
}
