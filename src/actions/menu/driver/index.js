import Action from '../../../action';
import objectAssign from 'object-assign';
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import ErrorResponse from '../../../responses/error-response';

/**
 * Driver index menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-05
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverIndex extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(objectAssign({ type: 'driver-index' }, options));
  }

  /**
   * Returns list of available options: checkin, disable notification, settings
   *
   * @return {OptionsResponse} - response with options
   */
  get() {
    return new OptionsResponse({
      rows: [
        [
          { label: this.t('checkin'), value: 'checkin' },
          { label: this.t('disable_notifications'), value: 'disable_notifications' },
          { label: this.t('settings'), value: 'settings' },
        ],
      ],
    });
  }

  /**
   * Redirect to another action based on provided value.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which is one of the following combinations:
   * - {@link TextResponse} + {@link RedirectResponse} - for checkin and notifications
   * - {@link RedirectResponse} - for settings
   * - {@link ErrorResponse} - when incorrect value posted
   */
  post(value) {
    const response = new CompositeResponse();

    switch (value) {
      case 'checkin':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new RedirectResponse({ path: 'driver-checkin' }));
        break;
      case 'disable_notifications':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new RedirectResponse({ path: 'foo' }));
        break;
      case 'settings':
        response.add(new RedirectResponse({ path: 'settings' }));
        break;
      default:
        response.add(new ErrorResponse({ message: this.t('unknown_choice') }));
    }

    return response;
  }
}
