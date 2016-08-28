import Action from '../../../action';
import TextResponse from '../../../responses/text-response';
import CompositeResponse from '../../../responses/composite-response';
import RedirectResponse from '../../../responses/redirect-response';

/**
 * Order cancelled action. Used to inform the passenger that order
 * has been cancelled, and redirects user passenger to index action.
 * To be used in {@link CancelCurrentOrderResponseHandler}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-28
 * @version 1.1
 * @since 0.1.0
 */
export default class OrderCancelled extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'order-cancelled' }, options));
  }

  /**
   * Returns text message and redirects to `passenger-index`.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RedirectResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('order_cancelled') }))
      .add(new RedirectResponse({ path: 'passenger-index' }));
  }
}
