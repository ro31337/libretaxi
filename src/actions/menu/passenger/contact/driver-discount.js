import Action from '../../../../action';
import CompositeResponse from '../../../../responses/composite-response';
import TextResponse from '../../../../responses/text-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';
import MetricDistance from '../../../../decorators/distance/metric-distance';

/**
 * Notify passenger about driver's phone number and discount. Basically, it means that
 * driver offered better price for the passenger and provided his/her phone number.
 * Called from outside from {@link DriverOrderOfferDiscount}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-28
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerContactDriverDiscount extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-contact-driver-discount' }, options));
  }

  /**
   * Notify passenger about driver's phone number and better price the following way:
   * - interrupt current prompt (for CLI only)
   * - show phone number and approximate (because there are no live check-ins) distance
   * - show driver's better price (can contain other details)
   * - redirect back to `order-submitted` action.
   *
   * @param {object} args - hash of parameters
   * @param {number} args.distance - distance to driver (in km)
   * @param {string} args.driverPhone - driver's phone number
   * @param {string} args.price - driver's better price (can also contain related details)
   * @return {CompositeResponse} response - composite response
   */
  call(args) {
    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new TextResponse({ message: this.t('message',
        {
          phone: args.driverPhone,
          distance: new MetricDistance(this.i18n, args.distance).toString(),
          price: args.price,
        }),
      }))
      .add(new RedirectResponse({ path: 'order-submitted' }));
  }
}
