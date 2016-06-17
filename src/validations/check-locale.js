import { ArgumentError } from './errors';
import SupportedLocales from './supported-locales';
import { Mixin } from 'mixwith';

/**
 * @typedef checkLocale
 *
 * Validating mixin, checks if `locale` is supported.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-17
 * @version 1.1
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.locale - Two-letter lower-cased locale, see {@link SupportedLocales}
   * @throws {ArgumentError} throw error when `options.locale` is not supported
   */
  constructor(options) {
    super(options);
    if (!options || !options.locale) {
      throw new ArgumentError('\'locale\' parameter not specified');
    }

    if (!SupportedLocales.has(options.locale)) {
      throw new ArgumentError(`locale '${options.locale}' not supported`);
    }
  }
});
