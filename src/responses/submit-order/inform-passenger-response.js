import Response from '../response';
import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null';

/**
 * Inform passenger on submit order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-09-13
 * @version 1.1
 * @since 0.1.0
 */
export default class InformPassengerResponse extends
  mix(Response).with(checkNotNull('passengerKey')) {
  /**
   * Constructor.
   *
   * @param {string} order.passengerKey - passenger user key, for example: `cli_1`
   */
  constructor(options) {
    const opts = Object.assign({ type: 'inform-passenger' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
