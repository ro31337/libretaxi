/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import log from './log';
import i18n from 'i18n';
import appRoot from 'app-root-path';
import Settings from '../settings';
import locales from './validations/supported-locales';

const settings = new Settings();
i18n.configure({
  locales,
  register: global,
  directory: `${appRoot.path}/locales`,
});

const lang = settings.DEFAULT_LANGUAGE;
i18n.setLocale(lang);

log.debug(`Init complete, default language set to ${lang}`);
