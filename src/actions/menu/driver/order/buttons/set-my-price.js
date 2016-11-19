import CallActionResponse from '../../../../../responses/call-action-response';
import checkNotNull from '../../../../../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * "Set my price" button (response). Calls {@link SaveAndRedirect} menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CallActionResponse}
 * @date 2016-10-27
 * @version 1.1
 * @since 0.1.0
 */
export class SetMyPrice extends
  mix(CallActionResponse).with(checkNotNull(['userKey', 'arg'])) {
  /**
  * Constructor.
  *
  * @param {object} options - hash of parameters
  * @param {string} options.userKey - redirect will be executed for this user
  * @param {object} options.arg - hash of parameters for {@link SaveAndRedirect}
  * @param {string} options.arg.passengerKey - passenger user key
  * @param {number} options.arg.distance - distance to driver
  * @param {number} options.arg.path - redirect path
  */
  constructor(options) {
    super(Object.assign({
      route: 'save-and-redirect',
      kicker: 'driver-index' }, options));
  }
}

/**
 * @typedef setMyPrice
 *
 * Set my price factory method. Creates instance of {@link SetMyPrice} based on
 * provided parameters. This will redirect driver to menu action where s/he can set the price.
 *
 * @param {object} args - hash of parameters
 * @param {string} args.passengerKey - passenger user key
 * @param {number} args.distance - distance from driver to passenger
 * @param {User} driver - driver user object
 * @return {string} instance - stringified instance of "set my price button" response
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-27
 * @version 1.1
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return new SetMyPrice({
    userKey: driver.userKey,
    arg: {
      passengerKey: args.passengerKey,
      distance: args.distance,
      path: 'driver-order-set-price',
    },
  });
};
