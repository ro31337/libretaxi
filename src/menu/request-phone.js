import Action from '../action';
import objectAssign from 'object-assign';
import RequestPhoneResponse from '../responses/request-phone-response';
import CompositeResponse from '../responses/composite-response';
import UserStateResponse from '../responses/user-state-response';
import TextResponse from '../responses/text-response';
import RedirectResponse from '../responses/redirect-response';

/**
 * Request phone menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-25
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhone extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(objectAssign({ type: 'request-phone' }, options));
  }

  /**
   * Returns text and request for phone.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RequestPhoneResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('type_your_phone') }))
      .add(new RequestPhoneResponse());
  }

  /**
   * Shows OK, sets selected user's phone and redirects.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains:
   * - {@link TextResponse}
   * - {@link UserStateResponse}
   * - {@link RedirectResponse}
   */
  post(value) {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new UserStateResponse({ phone: value }))
      .add(new RedirectResponse({ path: 'default' }));
  }
}
