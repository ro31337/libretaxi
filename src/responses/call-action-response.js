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

import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Call action response. Command to call action by route for specific user with or without
 * argument(s).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-10-21
 * @version 1.1
 * @since 0.1.0
 */
export default class CallActionResponse extends
  mix(Response).with(checkNotNull(['userKey', 'route'])) {
  /**
   * Constructor.
   *
   * @param {object} options - hash of parameters
   * @param {string} options.userKey - action will be called for this user
   * @param {string} options.route - action route, see {@link Routes}
   * @param {object|string} options.arg - (optional) argument(s) for action
   * @param {object} options.kicker - (optional) expected user state properties and their values
   * before calling the action. When specified, action is called only if kicker props equal
   * to `user.state` props.
   * @param {number} options.delay - (optional) delay to execute this action, msec. 0 by default.
   */
  constructor(options) {
    super(Object.assign({ type: 'call-action' }, options));
    Object.assign(this, options);
  }
}
