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

import ResponseHandler from './response-handler';
import { loadUser } from '../factories/user-factory';
import CaQueue from '../queue/ca-queue';
import log from '../log';

/**
 * Call action response handler. Calls action by route for specific user with or without
 * argument(s).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-10-21
 * @version 1.1
 * @since 0.1.0
 */
export default class CallActionResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'call-action-response-handler' }, options));
    this.queue = options.queue || new CaQueue();
  }

  /**
   * Handler entry point.
   * Creates a message in the queue to call action for specific user. If `response.kicker` is
   * specified, action is created only if `user.menuAction` equals `kicker`.
   */
  call(onResult) {
    const { userKey, arg, route, kicker, delay } = this.response;
    loadUser(userKey).then((user) => {
      if (kicker) { // TODO: good time to refactor kicker into it's own class (kicker.satisfied())
        for (const k of Object.keys(kicker)) {
          if (kicker[k] !== user.state[k]) {
            log.debug(`Kicker key ${k} doesn't equal to user state value (${kicker[k]} !== ${user.state[k]})`); // eslint-disable-line max-len
            log.debug(`Skip queueing message for ${userKey}, route ${route}`);
            onResult();
            return;
          }
        }
      } else {
        log.debug('Kicker not specified');
      }
      log.debug(`Create queue message for ${userKey}, route ${route}`);
      if (delay) {
        this.queue.createDelayed({ userKey, arg, route }, delay);
      } else {
        this.queue.create({ userKey, arg, route });
      }
      onResult();
    });
  }
}
