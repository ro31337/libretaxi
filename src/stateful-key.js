/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { mix } from 'mixwith';
import checkNotNull from './validations/check-not-null';
import checkPlatformType from './validations/check-platform-type';

/**
 * StatefulKey, unique key for State. Used to generate system-wide unique key
 * for your action, command, object state.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {checkPlatformType}
 * @date 2016-05-11
 * @version 1.1
 * @since 0.1.0
 */
export default class StatefulKey extends
  mix(class {}).with(checkNotNull(['platformType', 'platformId']), checkPlatformType) {
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
    Object.assign(this, options);
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
