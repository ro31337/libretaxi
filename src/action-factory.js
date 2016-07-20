import routes from './routes';
import i18n from 'i18n';
import appRoot from 'app-root-path';

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
   * @param {user} - {@link User} instance. Action is created
   * based on the following variables:
   *  - `user.state.menuLocation` (optional) - menu location
   *  - `user.state.locale` (optional) - locale (`en`, `ru`, etc.)
   * @return {Object} Instance of `Action`
   */
  static fromMenuLocation(user) {
    const location = user.state.menuLocation || 'default';
    const locale = user.state.locale || 'en';

    const action = routes[location];

    if (!action) {
      throw new Error(`Can't find route key "${location}" in routes`);
    }

    const t = {};

    i18n.configure({
      locales: ['en', 'ru'],
      register: t,
      directory: `${appRoot.path}/locales`,
    });

    t.setLocale(locale);
    return new action({ i18n: t }); // eslint-disable-line new-cap
  }
}
