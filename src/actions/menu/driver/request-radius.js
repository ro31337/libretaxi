import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import OptionsResponse from '../../../responses/options-response';
import If from '../../../responses/if-response';
import Radius from '../../../conditions/radius';
import UserStateResponse from '../../../responses/user-state-response';
import ErrorResponse from '../../../responses/error-response';

/**
 * Ask driver to select radius.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-10
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestRadius extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-request-radius' }, options));
  }

  /**
   * Response with radius options.
   *
   * @return {CompositeResponse} response
   */
  get() {
    return new OptionsResponse({
      rows: [
        [{ label: this.t('option1'), value: '1' }],
        [{ label: this.t('option3'), value: '3' }],
        [{ label: this.t('option5'), value: '5' }],
      ],
      defaultMessage: this.t('request_radius'),
    });
  }

  /**
   * Check the radius, redirect to next action if OK.
   *
   * @param {String} value - numeric value (as a string) is expected.
   * @return {CompositeResponse} response - conditional response
   */
  post(value) {
    return new If({
      condition: new Radius(value),
      ok: new CompositeResponse()
        .add(new UserStateResponse({ radius: value }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'driver-explain-whats-next' })),
      err: new ErrorResponse({ message: this.t('should_be_valid') }),
    });
  }
}
