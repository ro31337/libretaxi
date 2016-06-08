import routes from './routes';

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
    let location = menuLocation;

    if (!location) {
      location = 'default';
    }

    const action = routes[location];

    if (!action) {
      throw new Error(`Can't find route key "${location}" in routes`);
    }

    return new action; // eslint-disable-line new-cap
  }
}
