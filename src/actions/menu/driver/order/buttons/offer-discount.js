import CallActionResponse from '../../../../../responses/call-action-response';
import checkNotNull from '../../../../../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * "Offer discount" button (response). Calls {@link SaveAndRedirect} menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CallActionResponse}
 * @date 2016-10-29
 * @version 1.1
 * @since 0.1.0
 */
export class OfferDiscount extends
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
 * @typedef offerDiscount
 *
 * "Offer discount" factory method. Creates instance of {@link OfferDiscount} based on
 * provided parameters. This will redirect driver to menu action where s/he can offer discount.
 *
 * @param {object} args - hash of parameters
 * @param {string} args.passengerKey - passenger user key
 * @param {number} args.distance - distance from driver to passenger
 * @param {User} driver - driver user object
 * @return {string} instance - stringified instance of "offer discount button" response
 *
 * TODO: return parameter should be either signed, or stored in the database under guid,
 * otherwise it's theoretically possible to execute arbitrary response expression.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-29
 * @version 1.1
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return JSON.stringify(new OfferDiscount({
    userKey: driver.userKey,
    arg: {
      passengerKey: args.passengerKey,
      distance: args.distance,
      path: 'driver-order-offer-discount',
    },
  }));
};
