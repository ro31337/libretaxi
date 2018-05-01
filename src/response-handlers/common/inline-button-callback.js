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
import checkNotNull from '../../validations/check-not-null.js';
import ResponseHandlerFactory from '../../factories/response-handler-factory';
import EmptyResponse from '../../responses/empty-response';

/**
 * Inline button callback. Executes handler against stringified response stored in
 * provided `value`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @date 2016-10-16
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineButtonCallback extends
  mix(class {}).with(checkNotNull(['value', 'user'])) {

  /**
   * Constructor.
   *
   * @param {object} options - hash of parameters
   * @param {string} options.value - guid key for `user.state.inlineValues`, see {@link HistoryHash}
   * and {@link DriverOrderNew}.
   * @param {User} options.user - user
   * @param {Object} options.api - (optional) transport library api.
   */
  constructor(options) {
    super(options);
    this.type = 'inline-button-callback';
    Object.assign(this, options);
  }

  /**
   * Callback entry point. Calls handler against response.
   */
  call() {
    const response = ((this.user.state.inlineValues || {}).hash || {})[this.value] ||
      new EmptyResponse();
    const handler = ResponseHandlerFactory.getHandler({ response, user: this.user, api: this.api });
    handler.call(() => {});
  }
}
