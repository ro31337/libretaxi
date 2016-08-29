import Action from '../../action';
import RedirectResponse from '../../responses/redirect-response';

/**
 * Redirect menu action, just redirects to another action.
 * Useful in some cases, because it updates `menuLocation`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-28
 * @version 1.1
 * @since 0.1.0
 */
export default class Redirect extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'redirect' }, options));
  }

  /**
   * Redirects to `path`.
   *
   * @param {string} path - path to new action
   * @return {RedirectResponse} Returns instance of {@link RedirectResponse}
   */
  call(path) {
    return new RedirectResponse({ path });
  }
}
