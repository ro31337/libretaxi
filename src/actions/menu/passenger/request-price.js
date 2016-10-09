import Action from '../../../action';
import RequestUserInputResponse from '../../../responses/request-user-input-response';
import CompositeResponse from '../../../responses/composite-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import ErrorResponse from '../../../responses/error-response';
import RedirectResponse from '../../../responses/redirect-response';
import SubmitOrderResponse from '../../../responses/submit-order/submit-order-response';
import Firebase from 'firebase';
import If from '../../../responses/if-response';
import Numeric from '../../../conditions/numeric';

/**
 * Passenger request price menu action.
 * Asking passenger for the offer price for the order, submitting order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-08
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerRequestPrice extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-request-price' }, options));
  }

  /**
   * Returns `text` and `request user input` responses asking for price.
   *
   * @return {CompositeResponse} response - returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RequestUserInputResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('set_price') }))
      .add(new RequestUserInputResponse());
  }

  /**
   * Saves price to state. Responds with OK message, submits order and
   * redirects to blank screen (menu action).
   *
   * @param {string} value - string that represents price (should be numeric)
   * @return {IfResponse} response - returns conditional response that submits order response
   * if `value` is numeric, and returns error if `value` is not numeric.
   */
  post(value) {
    return new If({
      condition: new Numeric(value),
      ok: new CompositeResponse()
        .add(new UserStateResponse({ price: value }))
        .add(new SubmitOrderResponse({
          passengerKey: this.user.userKey,
          passengerLocation: this.user.state.location,
          passengerDestination: this.user.state.destination,
          price: value,
          createdAt: Firebase.database.ServerValue.TIMESTAMP,
          requestedVehicleType: this.user.state.requestedVehicleType,
        }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'blank-screen' })),
      err: new CompositeResponse()
        .add(new ErrorResponse({ message: this.t('should_be_numeric') }))
        .add(new RedirectResponse({ path: 'passenger-request-price' })),
    });
  }
}
