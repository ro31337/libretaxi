import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import UserStateResponse from '../../../responses/user-state-response';

/**
 * Reset user location to default.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-06-24
 * @version 1.0
 * @since 0.1.0
 */
export default class ResetUser extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'system-reset-user' }, options));
  }

  /**
   * Returns confirmation text and changes user menu location to "default".
   *
   * @return {CompositeResponse} - instance of composite response
   */
  call() {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new UserStateResponse({ menuLocation: 'default' }));
  }
}
