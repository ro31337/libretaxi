import ResponseHandler from './response-handler';

/**
 * Empty response handler handler. Does nothing. It also doesn't call `onResult`
 * callback, so it breaks main app loop.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-26
 * @version 1.1
 * @since 0.1.0
 */
export default class EmptyResponseHandler extends ResponseHandler {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'empty-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Does nothing. Note that this method doesn't call `onResult` callback, so
   * it breaks main app loop.
   */
  call() {
  }
}
