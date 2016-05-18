import { ArgumentError } from './errors';

/**
 * Validator for {@link StageStorage}.
 * It validates constructor parameters only and has no other behavior.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-17
 * @version 1.1
 * @since 0.1.0
 */
export default class ValidatedStateStorage {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} key - String representation of storage key, see {@link StateKey}
   * @throws {ArgumentError} throw error when key not specified
   */
  constructor(key) {
    if (!key) {
      throw new ArgumentError('key parameter not specified');
    }
  }
}
