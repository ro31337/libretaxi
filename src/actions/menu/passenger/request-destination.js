import Action from '../../../action';
import RequestUserInputResponse from '../../../responses/request-user-input-response';
import CompositeResponse from '../../../responses/composite-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import SubmitOrderResponse from '../../../responses/submit-order/submit-order-response';
import Firebase from 'firebase';

/**
 * Passenger request destination menu action.
 * Asking passenger to provide destination.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-11
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerRequestDestination extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-request-destination' }, options));
  }

  /**
   * Returns `text` and `request user input` responses.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RequestUserInputResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('provide_destination') }))
      .add(new RequestUserInputResponse());
  }

  /**
   * Saves user's destination to state. Responds with OK message, and
   * redirects to blank screen (menu action).
   *
   * @param {string} value - string that represents destination.
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * that contains the following responses:
   * - {@link UserStateResponse} - with `destination` prop set to `value`
   * - {@link TextResponse} - with OK message
   * - {@link RedirectResponse} - with redirect to blank screen.
   */
  post(value) {
    return new CompositeResponse()
      .add(new UserStateResponse({ destination: value }))
      .add(new SubmitOrderResponse({
        passengerKey: this.user.userKey,
        passengerLocation: this.user.state.location,
        passengerDestination: value,
        createdAt: Firebase.database.ServerValue.TIMESTAMP,
      }))
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'blank-screen' }));
  }
}
