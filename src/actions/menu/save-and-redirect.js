import Action from '../../action';
import RedirectResponse from '../../responses/redirect-response';
import CompositeResponse from '../../responses/composite-response';
import UserStateResponse from '../../responses/user-state-response';

/**
 * Redirect menu action, redirects to another action and saves arguments in user state.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-18
 * @version 1.1
 * @since 0.1.0
 */
export default class SaveAndRedirect extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'save-and-redirect' }, options));
  }

  /**
   * Save args in user state and redirect to `args.path`.
   *
   * @param {object} args - hash of parameters
   * @param {string} args.path - path to new action
   * @return {RedirectResponse} Returns instance of {@link RedirectResponse}
   */
  call(args) {
    return new CompositeResponse()
      .add(new UserStateResponse({ redirectArgs: args }))
      .add(new RedirectResponse({ path: args.path }));
  }
}
