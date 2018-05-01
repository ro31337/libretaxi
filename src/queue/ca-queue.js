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

import Queue from './queue';

/**
 * "Call action" queue. Used to call menu actions.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-26
 * @version 1.1
 * @since 0.1.0
 */
export default class CaQueue extends Queue {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'call-action' }, options));
  }

  /**
   * Creates a message and enqueues.
   *
   * @param {Object} options - hash of parameters
   * @param {string} options.userKey - represents the user for whom action should be executed.
   * @param {Object} options.arg - single argument (string or object) to be passed to action.
   * @param {string} options.route - route for this action, see {@link Routes} for full list.
   */
  // create(options) {
  //   super.create(options);
  // }

  /**
   * Creates a message and enqueues with 1 second delay.
   *
   * Unfortunately, this delay is mandatory.
   * We need this delay because in `passenger/request-destination.js` we
   * have composite response that contains the following sequence:
   *
   * - UserStateResponse
   * - SubmitOrderResponse
   * - TextResponse({ message: '👌 OK!' }))
   * - RedirectResponse({ path: 'blank-screen' }));
   *
   * And we execute this code on the second step (SubmitOrderResponse).
   * Somehow we need to make sure that all the next steps done before we
   * post to the queue request to call another action. Now it's done
   * with delay(1000), but it's definitely area of improvement.
   *
   * @param {Object} options - hash of parameters
   * @param {string} options.userKey - represents the user for whom action should be executed.
   * @param {Object} options.arg - single argument (string or object) to be passed to action.
   * @param {string} options.route - route for this action, see {@link Routes} for full list.
   */
  // createDelayed(options) {
  //   super.createDelayed(options);
  // }

  /**
   * Redirects to action with delay. Works exactly the same as `callActionWithDelay`,
   * but calls {@link Redirect} action. Used to set `menuLocation`. Note that currently
   * you can't provide argument (`arg`), so you can redirect only to `get` method.
   *
   * @param {Object} options - hash of parameters
   * @param {string} options.userKey - represents the user for whom action should be executed.
   * @param {string} options.route - route for this action, see {@link Routes} for full list.
   * @see https://github.com/ro31337/libretaxi/issues/208#issuecomment-243022762
   */
  redirect(options) {
    this.createDelayed({ userKey: options.userKey, arg: options.route, route: 'redirect' });
  }
}
