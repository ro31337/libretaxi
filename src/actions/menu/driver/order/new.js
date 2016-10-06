import Action from '../../../../action';
import CompositeResponse from '../../../../responses/composite-response';
import TextResponse from '../../../../responses/text-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';
import MetricDistance from '../../../../decorators/distance/metric-distance';
import GoogleMapsLink from '../../../../decorators/location/google-maps-link';

/**
 * Notify driver about new order.
 * Called from outside by {@link NotifyDriversResponseHandler}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-30
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverOrderNew extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-order-new' }, options));
  }

  /**
   * Simplified order notification:
   * - interrupts current prompt (for CLI only)
   * - shows order details
   * - redirects back to `driver-index`
   *
   * @param {object} args - hash of parameters
   * @param {number} args.distance - distance to passenger (in km)
   * @param {Array} args.from - passenger location, for example `[37.421955, -122.084058]`
   * @param {string} args.to - passenger destination (can contain passenger random comments)
   * @return {CompositeResponse} - composite response
   */
  call(args) {
    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new TextResponse({ message: this.t('new_order') }))
      .add(new TextResponse({ message: this.t('distance',
        new MetricDistance(this.i18n, args.distance).toString()) }))
      .add(new TextResponse({ message: this.t('from',
        new GoogleMapsLink(args.from).toString()) }))
      .add(new TextResponse({ message: this.t('to', args.to) }))
      .add(new TextResponse({ message: this.t('call_to_action') }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
