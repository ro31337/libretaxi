import log from './log';
import i18n from 'i18n';
import appRoot from 'app-root-path';
import Settings from '../settings';

const settings = new Settings();
i18n.configure({
  locales: ['en', 'es', 'id', 'pt-br', 'ru', 'fr'],
  register: global,
  directory: `${appRoot.path}/locales`,
});

const lang = settings.DEFAULT_LANGUAGE;
i18n.setLocale(lang);

log.debug(`Init complete, default language set to ${lang}`);
