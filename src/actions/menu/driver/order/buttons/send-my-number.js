import CallActionResponse from '../../../../../responses/call-action-response';
import checkNotNull from '../../../../../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * "Send my number" button (response). Sends driver's number to passenger by calling action
 * for specified passenger with provided arguments.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CallActionResponse}
 * @date 2016-10-22
 * @version 1.1
 * @since 0.1.0
 */
export class SendMyNumber extends mix(CallActionResponse).with(checkNotNull(['userKey', 'arg'])) {
  /**
  * Constructor.
  *
  * @param {object} options - hash of parameters
  * @param {string} options.userKey - action will be called for this user
  * @param {object} options.arg - hash of parameters for {@link PassengerContactNewNumber}.
  * @param {string} options.arg.driverPhone - driver phone number
  * @param {number} options.arg.distance - distance to driver
  */

  constructor(options) {
    super(Object.assign({
      route: 'passenger-contact-new-number',
      kicker: 'order-submitted' }, options));
  }
}

/**
 * @typedef sendMyNumber
 *
 * Send my number factory method. Creates instance of {@link SendMyNumber} based on
 * provided parameters.
 *
 * @param {object} args - hash of parameters
 * @param {string} args.passengerKey - passenger userKey
 * @param {number} args.distance - distance from passenger to driver
 * @param {User} driver - driver user object (`driver.state.phone` is required)
 * @return {string} instance - stringified instance of "send my number button" response
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-22
 * @version 1.1
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return new SendMyNumber({
    userKey: args.passengerKey,
    arg: {
      driverPhone: driver.state.phone,
      distance: args.distance,
    },
  });
};
