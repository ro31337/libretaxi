import Action from '../../action';
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import UserStateResponse from '../../responses/user-state-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import If from '../../responses/if-response';
import In from '../../conditions/in';
import ErrorResponse from '../../responses/error-response';

/**
 * Select user type menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectUserType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'select-user-type' }, options));
  }

  /**
   * Return text and list of available user types.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('who_you_are') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.t('driver'), value: 'driver' }],
          [{ label: this.t('passenger'), value: 'passenger' }],
        ],
      }));
  }

  /**
   * Conditionally set selected user type and redirect.
   *
   * @return {IfResponse} response - return conditional response
   */
  post(value) {
    return new If({
      condition: new In(value, ['driver', 'passenger']),
      ok: new CompositeResponse()
        .add(new UserStateResponse({ userType: value }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'request-phone' })),
      err: new ErrorResponse({ message: this.gt('error_try_again') }),
    });
  }
}
