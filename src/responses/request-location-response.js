import Response from './response';

/**
 * "Request location" response. Used to request user's location.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-01
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestLocationResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - (optional) message to display before asking location,
   * platform-specific.
   * @param {string} options.buttonText - (optional) text on the button for asking location,
   * platform-specific.
   */
  constructor(options) {
    super({ type: 'request-location' });
    Object.assign(this, options);
  }
}
