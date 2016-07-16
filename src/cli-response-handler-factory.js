import TextResponseHandler from './response-handlers/cli/text-response-handler';
import OptionsResponseHandler from './response-handlers/cli/options-response-handler';

const map = {
  text: TextResponseHandler,
  options: OptionsResponseHandler,
};

/**
 * Action factory, implements factory method(s) to create actions based on
 * provided key. See source code for the list of keys and corresponding
 * actions.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-26
 * @version 1.1
 * @since 0.1.0
 */
export default class CliResponseHandlerFactory {
  /**
   * Creates concrete `Action` instance based on menu location.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-26
   * @version 1.1
   * @since 0.1.0
   * @param {user} - {@link User} instance. Action is created
   * based on the following variables:
   *  - `user.state.menuLocation` (optional) - menu location
   *  - `user.state.locale` (optional) - locale (`en`, `ru`, etc.)
   * @return {Object} Instance of `Action`
   */
  static fromResponse(response) {
    const klass = map[response.type];
    return new klass({ response }); // eslint-disable-line new-cap
  }
}
