import ResponseHandler from './response-handler';
import { loadUser } from '../factories/user-factory';
import CaQueue from '../queue/ca-queue';

/**
 * Call action response handler. Calls action by route for specific user with or without
 * argument(s).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-10-21
 * @version 1.1
 * @since 0.1.0
 */
export default class CallActionResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'call-action-response-handler' }, options));
    this.queue = options.queue || new CaQueue();
  }

  /**
   * Handler entry point.
   * Creates a message in the queue to call action for specific user. If `response.kicker` is
   * specified, action is created only if `user.menuAction` equals `kicker`.
   */
  call(onResult) {
    const { userKey, arg, route, kicker } = this.response;
    loadUser(userKey).then((user) => {
      if (!kicker || user.state.menuLocation === kicker) {
        this.queue.create({ userKey, arg, route });
      }
      onResult();
    });
  }
}
