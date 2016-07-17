import ResponseHandler from '../response-handler';
import objectAssign from 'object-assign';

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
  constructor(options) {
    super(objectAssign({ type: 'cli-text-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prints the message to console.
   */
  call(onResult) {
    console.log(this.response.message); // eslint-disable-line no-console
    onResult();
  }
}
