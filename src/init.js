require('dotenv').config();
import Log from './log';
import i18n from 'i18n';
import appRoot from 'app-root-path';

const log = new Log();

i18n.configure({
  locales: ['en', 'ru'],
  register: global,
  directory: `${appRoot.path}/locales`,
});

const lang = process.env.DEFAULT_LANGUAGE;
i18n.setLocale(lang);

log.debug(__('init.init_complete', lang));
