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

import Action from '../../action';
import UserStateResponse from '../../responses/user-state-response';
import CompositeResponse from '../../responses/composite-response';
import EmptyResponse from '../../responses/empty-response';

/**
 * Update user identity.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-28
 * @version 1.1
 * @since 0.1.0
 */
export default class UpdateIdentity extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'update-identity' }, options));
  }

  /**
   * Update identity, save `first`, `last`, `username` to `user.state.identity`.
   *
   * @param {Object} args - hash of parameters
   * @param {string} args.first - first name
   * @param {string} args.last - last name
   * @param {string} args.username - platform username (for example, `@ro31337` for Telegram)
   * @return {CompositeResponse} - response to update state
   */
  call(args) {
    return new CompositeResponse()
      .add(new UserStateResponse({
        identity: {
          first: args.first,
          last: args.last,
          username: args.username,
        },
      }))
      .add(new EmptyResponse()); // prevent calling the next action
  }
}
