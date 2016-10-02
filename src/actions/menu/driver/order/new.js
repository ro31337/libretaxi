import Action from '../../../../action';
import CompositeResponse from '../../../../responses/composite-response';
import TextResponse from '../../../../responses/text-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';

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
   * @return {CompositeResponse} - composite response
   */
  call() {
    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new TextResponse({ message: '🔔 New order!' })) // no i18n, to be changed soon
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
