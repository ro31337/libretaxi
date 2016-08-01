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
   */
  constructor() {
    super({ type: 'request-location' });
  }
}
