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

/**
 * @typedef LocaleMap
 * @desc Key/value map where:
 * - key - locale
 * - value - title
 * Note: Map _guarantees_ the keys order. But it shouldn't be initialized with object (where
 * order is not guaranteed). This data structure is similar to rails OrderedHash where we can
 * rely on order and have advantage of quick lookup by the key.
 * @extends {Map}
 * @see https://mzl.la/2jRpmTI
 */
const localeMap = new Map();
localeMap.set('en', 'English');
localeMap.set('ru', '🇷🇺 Русский');
localeMap.set('es', 'Español');
localeMap.set('fa', 'فارسی');
localeMap.set('zh-cn', '官话');
localeMap.set('zh-tw', '繁體中文');
localeMap.set('jp', '🇯🇵 日本語');
localeMap.set('fr', 'Français');
localeMap.set('de', 'Deutsch');
localeMap.set('it', '🇮🇹 Italiano');
localeMap.set('pt-br', '🇧🇷 Português');
localeMap.set('sv', '🇸🇪 Svenska');
localeMap.set('fi', '🇫🇮 Suomi');
localeMap.set('pl', '🇵🇱 Polski');
localeMap.set('cz', '🇨🇿 Česky');
localeMap.set('tr', '🇹🇷 Türkçe');
localeMap.set('am', '🇦🇲 Հայերեն');
localeMap.set('ua', '🇺🇦 Українська');
localeMap.set('ro', '🇷🇴 Română');
localeMap.set('hi', 'हिन्दी');
localeMap.set('ta', 'தமிழ்');
localeMap.set('id', '🇮🇩 Bahasa Indonesia');
localeMap.set('vi', '🇻🇳 Tiếng Việt');
localeMap.set('ki', 'Kiribati');
localeMap.set('ku', 'کوردی 🇹🇯');
localeMap.set('ar', 'عربي');
localeMap.set('bn', 'বাংলা');

/**
 * @typedef SupportedLocales
 * @desc Array set that represents the list of currently supported locales:
 * - `en` - English locale
 * - `ru` - Russian locale
 * etc..
 * @extends {Array}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-17
 * @version 1.1
 * @since 0.1.0
 * @example
 * import SupportedLocales from './supported-locales';
 * if (!SupportedLocales.includes('cn')) {
 *   console.log('locale "cn" is not supported yet');
 * }
 */
export default Array.from(localeMap.keys());
export { localeMap };
