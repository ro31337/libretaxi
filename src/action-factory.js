import SelectLanguage from './menu/select-language';

const routes = {
  'select-language': SelectLanguage,
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
export default class ActionFactory {
  /**
   * Creates concrete `Action` instance based on menu location.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-26
   * @version 1.1
   * @since 0.1.0
   * @param {string} menuLocation (optional) User's menu location. Should be
   * `user.state.menuLocation`.
   * @return {Object} Instance of `Action`
   */
  static fromMenuLocation(menuLocation) {
    if (!menuLocation) {
      return new SelectLanguage(); // default location
    }

    const action = routes[menuLocation];

    if (!action) {
      throw new Error(`Can't find route key "${menuLocation}" in routes`);
    }

    return new action; // eslint-disable-line new-cap
  }
}
