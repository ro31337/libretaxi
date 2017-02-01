import i18n from 'i18n';
import appRoot from 'app-root-path';

/**
 * @typedef initLocale
 *
 * Init i18n object based on `user.state.locale` and return newly created provisioned object.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-27
 * @version 1.1
 * @since 0.1.0
 */
export default (user) => { // eslint-disable-line
  const locale = (user.state || {}).locale || 'en';

  const t = {};

  i18n.configure({
    locales: ['en', 'es', 'id', 'pt-br', 'ru', 'tr', 'fr'],
    register: t,
    directory: `${appRoot.path}/locales`,
  });

  t.setLocale(locale);
  return t;
};
