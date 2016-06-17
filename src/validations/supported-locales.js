/**
 * @typedef SupportedLocales
 * @desc Hash set that represents the list of currently supported locales:
 * - `en` - English locale
 * - `ru` - Russian locale
 * @extends {Set}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-17
 * @version 1.1
 * @since 0.1.0
 * @example
 * import SupportedLocales from './supported-locales';
 * if (!SupportedLocales.has('cn')) {
 *   console.log('locale "cn" is not supported yet');
 * }
 */
export default new Set(['en', 'ru']);
