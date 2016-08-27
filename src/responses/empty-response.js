import Response from './response';

/**
 * Empty response. Can be use to break processing loop.
 * See {@link EmptyResponseHandler} for details.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-26
 * @version 1.1
 * @since 0.1.0
 */
export default class EmptyResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    super({ type: 'empty' });
  }
}
