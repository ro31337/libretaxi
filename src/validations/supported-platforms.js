/**
 * @typedef SupportedPlatforms
 * @desc Hash set that represents the list of currently supported platforms:
 * - telegram
 * - cli
 * @extends {Set}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-27
 * @version 1.1
 * @since 0.1.0
 * @example
 * import SupportedPlatforms from './supported-platforms';
 * if (!SupportedPlatforms.has('whatsapp')) {
 *   console.log('platform "whatsapp" is not supported');
 * }
 */
export default new Set(['telegram', 'cli']);
