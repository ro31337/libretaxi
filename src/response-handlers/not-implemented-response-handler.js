import ResponseHandler from './response-handler';

/**
 * Not implemented response handler. Stub for not implemented response handlers.
 * Throws error on `call`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-17
 * @version 1.1
 * @since 0.1.0
 */
export default class NotImplementedResponseHandler extends ResponseHandler {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'not-implemented-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Throws `not implemented` exception.
   */
  call() {
    throw new Error('not implemented');
  }
}
