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

import stateful from './stateful';
import StatefulKey from './stateful-key';
import { mix } from 'mixwith';
import checkNotNull from './validations/check-not-null';
import checkPlatformType from './validations/check-platform-type';

/**
 * User.
 * Represents the user who belongs to specific platform (Telegram, Cli, etc.)
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedUser}
 * @date 2016-04-25
 * @version 1.1
 * @since 0.1.0
 */
export default class User extends
  mix(stateful()).with(checkNotNull(['platformType', 'platformId']), checkPlatformType) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type identifier,
   * for example: "telegram", or "cli". See {@link SupportedPlatforms}
   * @param {string} options.platformId - User unique id for specified platform.
   */
  constructor(options) {
    super(options);
    Object.assign(this, options);

    this.userKey = new StatefulKey({
      platformType: this.platformType,
      platformId: this.platformId }).toString();

    this.stateful = {
      key: this.userKey,
      table: 'users',
    };
  }
}
