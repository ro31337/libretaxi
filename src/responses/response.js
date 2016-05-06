/* eslint-disable no-useless-constructor */
import ValidatedResponse from '../validations/validated-response';

/**
 * Response to request. Supposed to be returned from the `Action` every
 * time user makes request.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedResponse}
 * @abstract
 * @date 2016-05-04
 * @version 1.1
 * @since 0.1.0
 */
export default class Response extends ValidatedResponse {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   */
  constructor(options) {
    super(options);
  }
}
