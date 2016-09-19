import Action from '../../../action';
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import ErrorResponse from '../../../responses/error-response';

/**
 * Select vehicle type for driver (menu action).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-30
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectVehicleType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-select-vehicle-type' }, options));
  }

  /**
   * Returns list of available vehivle types (motorbike, car).
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('select') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('motorbike'), value: 'motorbike' },
            { label: this.t('car'), value: 'car' },
          ],
        ],
      }));
  }

  /**
   * Saves `vehicleType` to user's state and redirects to action explaining checkins.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} + {@link UserStateResponse} + {@link RedirectResponse}
   * @return {ErrorResponse} when posted value is unknown
   */
  post(value) {
    const response = new CompositeResponse();

    switch (value) {
      case 'motorbike':
      case 'car':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new UserStateResponse({ vehicleType: value }));
        response.add(new RedirectResponse({ path: 'driver-explain-checkins' }));
        break;
      default:
        response.add(new ErrorResponse({ message: this.t('error_only_known_type') }));
    }

    return response;
  }
}
