import { ArgumentError } from './errors';
import SupportedPlatforms from './supported-platforms';
import { Mixin } from 'mixwith';

/**
 * @typedef ValidatedStatefulKey
 *
 * Validating mixin for {@link StatefulKey}.
 * Validates `platformType`
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-11
 * @version 1.2
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
    if (!SupportedPlatforms.has(options.platformType)) {
      throw new ArgumentError(`platform type "${options.platformType}" not supported`);
    }
  }
});
