import ValidatedStatefulKey from './validations/validated-stateful-key';
import objectAssign from 'object-assign';

/**
 * StatefulKey, unique key for State. Used to generate system-wide unique key
 * for your action, command, object state.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedStatefulKey}
 * @date 2016-05-11
 * @version 1.1
 * @since 0.1.0
 */
export default class StatefulKey extends ValidatedStatefulKey {
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
   * @example
   * const k = new StatefulKey('telegram', '31337', '4566bd48-d369-4594-aa1e-fb5dae1acf43');
   */
  constructor(options) {
    super(options);
    objectAssign(this, options);
  }

  toString() {
    return `${this.platformType}_${this.platformId}_${this.guid}`.toLowerCase();
  }
}
