import { ArgumentError } from './errors';
import SupportedResponseTypes from './supported-response-types';
import { Mixin } from 'mixwith';

/**
 * @typedef ValidatedResponse
 *
 * Validator for {@link Response}.
 * It validates constructor parameters only and has no other behavior.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-04
 * @version 1.3
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   * @throws {ArgumentError} throw error when `options.type` is not supported.
   * See {@link SupportedResponseTypes}.
   */
  constructor(options) {
    super(options);
    if (!SupportedResponseTypes.has(options.type)) {
      throw new ArgumentError(`response with type "${options.type}" not supported`);
    }
  }
});
