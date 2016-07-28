import Action from './../action';
import objectAssign from 'object-assign';
import CompositeResponse from '../responses/composite-response';
import TextResponse from '../responses/text-response';
import RedirectResponse from '../responses/redirect-response';

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
    super(objectAssign({ type: 'foo' }, options));
  }

  /**
   * Returns sample text message.
   *
   * @return {TextResponse} - returns sample text message
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: 'Redirecting from foo to default route...' }))
      .add(new RedirectResponse({ path: 'default' }));
  }
}
