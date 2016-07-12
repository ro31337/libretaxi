import ResponseHandler from '../response-handler';

/**
 * Text response cli handler.
 * Prints {@link TextResponse} message to console.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-12
 * @version 1.1
 * @since 0.1.0
 */
export default class TextResponseHandler extends ResponseHandler {
  /**
   * Handler entry point.
   * Prints the message to console.
   */
  call() {
    console.log(this.response.message); // eslint-disable-line no-console
  }
}
