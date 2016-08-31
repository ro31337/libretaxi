import Action from '../../../action';
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
/**
 * Select taxi type for driver (menu action).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-30
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectTaxiType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-select-taxi-type' }, options));
  }

  /**
   * Returns list of available taxi types (scooter, bike, and car).
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('select_taxi_type') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('scooter'), value: 'scooter' },
            { label: this.t('bike'), value: 'bike' },
            { label: this.t('car'), value: 'car' },
          ],
        ],
      }));
  }

  /**
   * Saves `taxiType` to user's state and temporarily redirects to stub menu action.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} + {@link UserStateResponse} + {@link RedirectResponse}
   */
  post(value) {
    const response = new CompositeResponse();

    switch (value) {
      case 'scooter':
      case 'bike':
      case 'car':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new UserStateResponse({ taxiType: value }));
        response.add(new RedirectResponse({ path: 'foo' }));
        break;
      default:
        throw new Error(`unsupported choice '${value}'`);
    }

    return response;
  }
}
