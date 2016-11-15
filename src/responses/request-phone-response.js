import Response from './response';

/**
 * "Request phone" response. Used to request user's phone number.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhoneResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.message - (optional) message to display before asking the phone,
   * platform-specific.
   * @param {string} options.buttonText - (optional) text on the button for asking the phone,
   * platform-specific.
   */
  constructor(options) {
    super({ type: 'request-phone' });
    Object.assign(this, options);
  }
}
