import Action from '../../action';
import RedirectResponse from '../../responses/redirect-response';

/**
 * Sample menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-20
 * @version 1.1
 * @since 0.1.0
 */
export default class Foo extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'foo' }, options));
  }

  /**
   * Returns sample text message.
   *
   * @return {TextResponse} - returns sample text message
   */
  call() {
    return new RedirectResponse({ path: 'default' });
  }
}
