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
   */
  constructor() {
    super({ type: 'request-phone' });
  }
}
