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
localeMap.set('es', 'Español');
localeMap.set('id', '🇮🇩 Bahasa Indonesia');
localeMap.set('pt-br', '🇧🇷 Português');
localeMap.set('ru', '🇷🇺 Русский');
localeMap.set('tr', '🇹🇷 Türkçe');

/**
 * @typedef SupportedLocales
 * @desc Array set that represents the list of currently supported locales:
 * - `en` - English locale
 * - `ru` - Russian locale
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
