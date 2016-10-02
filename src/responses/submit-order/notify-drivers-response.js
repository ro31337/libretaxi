import Response from '../response';
import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null';

/**
 * Notify drivers on submit order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-09-16
 * @version 1.1
 * @since 0.1.0
 */
export default class NotifyDriversResponse extends
  mix(Response).with(checkNotNull('passengerKey')) {
  /**
   * Constructor.
   *
   * @param {string} options.passengerKey - passenger who submitted the order.
   */
  constructor(options) {
    const opts = Object.assign({ type: 'notify-drivers' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
