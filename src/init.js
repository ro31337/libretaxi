require('dotenv').config();
import log from './log';
import i18n from 'i18n';
import appRoot from 'app-root-path';

i18n.configure({
  locales: ['en', 'ru'],
  register: global,
  directory: `${appRoot.path}/locales`,
});

const lang = process.env.DEFAULT_LANGUAGE;
i18n.setLocale(lang);

log.debug(`Init complete, default language set to ${lang}`);
