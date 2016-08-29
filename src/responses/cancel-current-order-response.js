import Response from './response';

/**
 * "Cancel current order" response. Used to cancel current order from
 * passenger side.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-27
 * @version 1.1
 * @since 0.1.0
 */
export default class CancelCurrentOrderResponse extends Response {
   /**
   * Constructor.
   */
  constructor() {
    super({ type: 'cancel-current-order' });
  }
}
