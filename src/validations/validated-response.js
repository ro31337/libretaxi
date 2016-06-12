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
 * @version 1.2
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   * @throws {ArgumentError} throw error when:
   * - constructor parameters (`options`) are not specified
   * - `options.type` is not specified
   * - `options.type` is not supported. See {@link SupportedResponseTypes}.
   */
  constructor(options) {
    super(options);

    if (!options) {
      throw new ArgumentError('constructor parameters not specified');
    }

    if (!options.type) {
      throw new ArgumentError('type parameter not specified');
    }

    if (!SupportedResponseTypes.has(options.type)) {
      throw new ArgumentError(`response with type "${options.type}" not supported`);
    }
  }
});
