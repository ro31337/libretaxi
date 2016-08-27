import Action from '../../action';
import TextResponse from '../../responses/text-response';
import CompositeResponse from '../../responses/composite-response';
import RedirectResponse from '../../responses/redirect-response';

/**
 * Order submitted action. Used to inform the passenger that order
 * has been submitted, and redirects passenger from the blank screen.
 * To be used in {@link SubmitOrderResponseHandler}. Implements `call` method
 * (the same handler for `get` and `post`).
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
   * Returns text message and temporarily redirects to `foo`.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RedirectResponse}.
   */
  call() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('order_submitted') }))
      .add(new RedirectResponse({ path: 'foo' }));
  }
}
