import ValidatedStatefulKey from './validations/validated-stateful-key';
import objectAssign from 'object-assign';
import { mix } from 'mixwith';
import checkNotNull from './validations/check-not-null.js';

class Dummy {}

/**
 * StatefulKey, unique key for State. Used to generate system-wide unique key
 * for your action, command, object state.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedStatefulKey}
 * @extends {checkNotNull}
 * @date 2016-05-11
 * @version 1.1
 * @since 0.1.0
 */
export default class StatefulKey extends
  mix(Dummy).with(checkNotNull(['platformType', 'platformId']), ValidatedStatefulKey) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type, see {@link SupportedPlatforms}
   * @param {string} options.platformId - unique identifier for the user of platform
   * @param {string} options.guid - (optional) Unique id of action, command, object, etc.
   * where `State` supposed to be mixed into.
   * @throws {ArgumentError} throw error when:
   * - options.platformType not specified or not supported
   * - options.platformId not specified
   */
  constructor(options) {
    super(options);
    objectAssign(this, options);
  }

  /**
   * Converts object to string representation.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-22
   * @version 1.1
   * @since 0.1.0
   * @return {string} String representation of object
   * @example
   * const k = new StatefulKey('telegram', '31337', '4566bd48-d369-4594-aa1e-fb5dae1acf43');
   * k.toString(); // => telegram_31337_4566bd48-d369-4594-aa1e-fb5dae1acf43
   * @example
   * const k = new StatefulKey('cli', '1');
   * k.toString(); // => cli_1
   */
  toString() {
    let result = `${this.platformType}_${this.platformId}`;
    if (this.guid) {
      result += `_${this.guid}`;
    }
    return result.toLowerCase();
  }
}
