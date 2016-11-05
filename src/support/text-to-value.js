import OptionsMap from './options-map';
import ActionFactory from '../factories/action-factory';

/**
 * @typedef textToValue
 *
 * Convert submitted text to it's value. Useful helper for Telegram keyboard. Because of
 * Telegram platform limitations we cannot bind values to keyboard buttons (only to inline
 * keyboards). So this helper resolves button value based on:
 * - Button text
 * - Current user menu location
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-05
 * @version 1.1
 * @since 0.1.0
 */
export default (user, text) => { // eslint-disable-line
  const route = user.state.menuLocation || 'default';
  const action = ActionFactory.fromRoute({ route, user });
  const response = action.call();
  const map = new OptionsMap({ response }).parse();
  return map[text] || text;
};
