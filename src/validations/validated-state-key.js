import { ArgumentError } from './errors';
import SupportedPlatforms from './supported-platforms';

/**
 * Validator for {@link StateKey}.
 * It validates constructor parameters only and has no other behavior.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-11
 * @version 1.1
 * @since 0.1.0
 */
export default class ValidatedStateKey {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type, see {@link SupportedPlatforms}
   * @param {string} options.platformId - unique identifier for the user of platform
   * @param {string} options.guid - Unique id of action, command, object, etc.
   * where `State` supposed to be mixed into.
   * @throws {ArgumentError} throw error when:
   * - options.platformType not specified or not supported
   * - options.platformId not specified
   * - options.guid not specified
   */
  constructor(options) {
    if (!options) {
      throw new ArgumentError('constructor parameters not specified');
    }

    if (!options.platformType) {
      throw new ArgumentError('platformType parameter not specified');
    }

    if (!SupportedPlatforms.has(options.platformType)) {
      throw new ArgumentError(`platform type "${options.platformType}" not supported`);
    }

    if (!options.platformId) {
      throw new ArgumentError('platformId parameter not specified');
    }

    if (!options.guid) {
      throw new ArgumentError('guid parameter not specified');
    }
  }
}
