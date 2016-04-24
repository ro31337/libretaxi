require('dotenv').config();
import Log from './log';
import i18n from 'i18n';

const log = new Log();

i18n.configure({
  locales: ['en', 'ru'],
  register: global,
  directory: 'locales',
});

const lang = process.env.DEFAULT_LANGUAGE;
i18n.setLocale(lang);

log.debug(__('init.init_complete', lang));
