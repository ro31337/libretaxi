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
 * Promise response. Used to execute a promise and perform an action based on result. Can be
 * useful when {@link Action} result cannot be calculated synchronously. Why this response and
 * handler required when you can just use `new Promise`? Because actions should return only one
 * type - {@link Response}. And each response can be handled the different way for the platform
 * like Telegram, CLI. However, some responses are the same for all platforms (like this one).
 * So responses are used to describe behavior, not to implement behavior. Behavior is implemented
 * in response handlers.
 *
 * Also, promise response can be useful when described behavior depends on user input and this
 * input can't be calculated synchronously. For example, {@link ParsedLocation} is synchronous
 * operation, but address lookup is asynchronous, so it can't be used directly in behavior tree,
 * because we want to avoid implementing behavior in responses.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {Response}
 * @date 2017-05-06
 * @version 1.1
 * @since 0.1.0
 */
export default class PromiseResponse extends
  mix(Response).with(checkNotNull(['promise', 'cb'])) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Promise} options.promise - promise to be executed
   * @param {Function} options.cb - resolve callback, to be called when promise resolved.
   * This callback called with parameter returned from resolved promise.
   * @example
   * const r = new PromiseResponse({
   *  promise: new Promise((resolve) => { resolve('foo') }),
   *  cb: (result) => { console.log(`resolved with ${result}`) },
   * });
   * // example above will print "resolved with foo"
   */
  constructor(options) {
    const opts = Object.assign({ type: 'promise' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
