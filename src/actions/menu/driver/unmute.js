import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import UserStateResponse from '../../../responses/user-state-response';

/**
 * Ummute notifications menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-08
 * @version 1.1
 * @since 0.1.0
 */
export default class Unmute extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-unmute' }, options));
  }

  /**
   * Unmutes notifications by updating `user.state.muted` to `false`.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains:
   * - {@link UserStateResponse} - updates user state
   * - {@link TextResponse} - shows OK message with short explanation
   * - {@link RedirectResponse} - redirects to `driver-index`
   */
  call() {
    return new CompositeResponse()
      .add(new UserStateResponse({ muted: false }))
      .add(new TextResponse({ message: this.t('unmute_ok') }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
