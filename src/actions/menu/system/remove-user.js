import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RemoveUserResponse from '../../../responses/remove-user-response';

/**
 * Remove user menu action. Returns confirmation text and removes current user from the database.
 * WARNING: there is no way to restore user data. Associated objects (orders, etc.) are NOT removed
 * in this version (it would be nice to have this functionality though, additional response
 * like RemoveUserOrdersResponse). Since we're using no-sql database and there are no any foreign
 * key restrictions, existing orders will be automatically linked back to newly created user(s) by
 * user id, like telegram_31337. Where 31337 is user id in Telegram. And this value is permanent
 * for Telegram (and usually other) platform(s).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-06-24
 * @version 1.0
 * @since 0.1.0
 */
export default class SelectLocale extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'system-remove-user' }, options));
  }

  /**
   * Returns confirmation text and remove user response.
   *
   * @return {CompositeResponse} - instance of composite response
   */
  call() {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RemoveUserResponse());
  }
}
