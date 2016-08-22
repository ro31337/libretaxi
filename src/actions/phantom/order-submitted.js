import Action from '../../action';
import TextResponse from '../../responses/text-response';

/**
 * Order submitted phantom action. Used to inform the passenger that order
 * has been submitted. To be used in {@link SubmitOrderResponseHandler}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-20
 * @version 1.1
 * @since 0.1.0
 */
export default class OrderSubmitted extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'order-submitted' }, options));
  }

  /**
   * Returns text message.
   *
   * @return {TextResponse} - message informing the user that order has been submitted.
   */
  call() {
    return new TextResponse({ message: this.t('order_submitted') });
  }
}
