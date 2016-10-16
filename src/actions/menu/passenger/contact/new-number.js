import Action from '../../../../action';
import CompositeResponse from '../../../../responses/composite-response';
import TextResponse from '../../../../responses/text-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';
import MetricDistance from '../../../../decorators/distance/metric-distance';

/**
 * Notify passenger about new driver's phone number. Basically, it means that
 * driver accepted passenger's order and agreed to the price.
 * Called from outside by {@link InlineOptionsResponseHandler}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-16
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerContactNewNumber extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-contact-new-number' }, options));
  }

  /**
   * Notify passenger about driver's phone number the following way:
   * - interrupt current prompt (for CLI only)
   * - show phone number and approximate (because there are no live check-ins) distance
   * - redirect back to `order-submitted` action.
   *
   * @param {object} args - hash of parameters
   * @param {number} args.distance - distance to driver (in km)
   * @param {string} args.driverPhone - driver's phone number
   * @return {CompositeResponse} - composite response
   */
  call(args) {
    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new TextResponse({ message: this.t('message', { phone: args.driverPhone,
        distance: new MetricDistance(this.i18n, args.distance).toString() }) }))
      .add(new RedirectResponse({ path: 'order-submitted' }));
  }
}
