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

import i18n from 'i18n';
import appRoot from 'app-root-path';
import locales from '../validations/supported-locales';

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
    locales,
    register: t,
    directory: `${appRoot.path}/locales`,
  });

  t.setLocale(locale);
  return t;
};
