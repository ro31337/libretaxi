import Response from './response';

/**
 * "Request user input" response. Used to request user to type something.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-11
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestUserInputResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    super({ type: 'request-user-input' });
  }
}
