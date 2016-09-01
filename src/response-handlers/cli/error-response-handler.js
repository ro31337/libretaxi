import ResponseHandler from '../response-handler';

/**
 * Error response cli handler.
 * Prints {@link ErrorResponse} message to console with a leading cross mark.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-31
 * @version 1.1
 * @since 0.1.0
 */
export default class ErrorResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-error-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prints the message with a leading cross mark (❌) to console.
   */
  call(onResult) {
    console.log(`❌ ${this.response.message}`); // eslint-disable-line no-console
    onResult();
  }
}
