import { ArgumentError } from './errors';
import SupportedPlatforms from './supported-platforms';
/**
 * Validator for {@link User}.
 * It validates constructor parameters only and has no other behavior.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-27
 * @version 1.1
 * @since 0.1.0
 */
export default class ValidatedUser {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type identifier,
   * for example: "telegram", or "cli". See {@link SupportedPlatforms}
   * @param {string} options.platformId - User unique id for specified platform.
   * @throws {ArgumentError} throw error when:
   * - constructor parameters (`options`) are not specified
   * - `options.platformType` is not specified
   * - `options.platformId` is not specified
   * - `options.platformType` is not supported. See {@link SupportedPlatforms}.
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
  }
}
