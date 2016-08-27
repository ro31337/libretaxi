import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null';

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
export default class CancelCurrentOrderResponse extends
 mix(Response).with(checkNotNull('passengerKey')) {
  /**
   * Constructor.
   * @param {string} options.passengerKey - passenger key
   */
  constructor(options) {
    super(Object.assign({ type: 'cancel-current-order' }, options));
    Object.assign(this, options);
  }
}
