import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null.js';
import UserFactory from '../../factories/user-factory';
import CaQueue from '../../queue/ca-queue';

/**
 * Inline button callback. Posts "call action" message to the queue with parameters from
 * inline button's value.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @date 2016-10-16
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineButtonCallback extends
  mix(class {}).with(checkNotNull(['label', 'value', 'expectedMenuLocation'])) {

  /**
   * Constructor.
   *
   * @param {object} options - hash of parameters
   * @param {string} options.label - button label
   * @param {string} options.value - button value. Should be stringified json that contains the
   * following parameters (all of them are required for {@link Queue} `.create` method):
   * - {string} userKey - action will be executed against this user
   * - {object} arg - parameter(s) to pass to the action
   * - {string} route - action route
   * @param {string} options.expectedMenuLocation - if user location is different from expected,
   * message won't be be posted to the queue. Useful when you don't want to interrupt users who
   * are busy (for example, in settings).
   * @param {object} options.queue - (optinal) queue dependency injection, useful for tests.
   */
  constructor(options) {
    super(options);
    this.type = 'inline-button-callback';
    this.label = options.label;
    this.value = options.value;
    this.expectedMenuLocation = options.expectedMenuLocation;
    this.queue = options.queue || new CaQueue();
  }

  /**
   * Callback entry point.
   */
  call() {
    const obj = JSON.parse(this.value);
    const userKey = obj.userKey;
    UserFactory.fromUserKey(userKey).load().then((user) => {
      if (user.state.menuLocation === this.expectedMenuLocation) {
        this.queue.create({ userKey, arg: obj.arg, route: obj.route });
      }
    });
  }
}
