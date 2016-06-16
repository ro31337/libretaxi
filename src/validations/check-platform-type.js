import { ArgumentError } from './errors';
import SupportedPlatforms from './supported-platforms';
import { Mixin } from 'mixwith';

/**
 * @typedef checkPlatformType
 *
 * Validating mixin, checks if `platformType` is supported.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-11
 * @version 1.3
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type, see {@link SupportedPlatforms}
   * @throws {ArgumentError} throw error when `options.platformType` not supported
   */
  constructor(options) {
    super(options);
    if (!options || !options.platformType) {
      throw new ArgumentError('\'platformType\' parameter not specified');
    }

    if (!SupportedPlatforms.has(options.platformType)) {
      throw new ArgumentError(`platform type '${options.platformType}' not supported`);
    }
  }
});
