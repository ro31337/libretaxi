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
