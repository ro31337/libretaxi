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

import ActionFactory from './factories/action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';
import log from './log';
import { loadUser } from './factories/user-factory';

// Function to handle actions.
// 1. Action is created based on provided `options.route`.
// 2. Action is called, response is received.
// 3. Handler is executed for specific response
// 4. If `once` is false, message is posted to `kue` when handler is finished.

export default (options) => { // eslint-disable-line
  // console.dir(options);
  // console.log('Current user state:');
  // console.dir(options.user.state);
  const user = options.user;
  const route = options.route || 'default';
  const queue = options.queue;

  const action = ActionFactory.fromRoute({ route, user });
  log.debug(`calling ${action.type} with ${options.arg}`);
  log.debug(options.arg);
  const response = action.call(options.arg);
  const handler = ResponseHandlerFactory.getHandler({ response, user, api: options.api });
  const userKey = user.userKey;

  const postNextMessage = (arg) => {
    // IMPORTANT: do not refer to any (heavy) existing objects here.
    // Do not reuse "user"" here, because it's unfortunately mutable and can be removed in some
    // of our actions. If you need something here, use string tokens and load!
    loadUser(userKey)
        .then(u => queue.create({ userKey, arg, route: u.state.menuLocation }));
  };
  handler.call(postNextMessage);
};
