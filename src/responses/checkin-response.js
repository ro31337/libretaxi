import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Checkin response. Used to inform driver about orders nearby.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-12-02
 * @version 1.1
 * @since 0.1.0
 */
export default class CheckinResponse extends mix(Response).with(checkNotNull('driverKey')) {
   /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'checkin' }, options));
    this.driverKey = options.driverKey;
  }
}
