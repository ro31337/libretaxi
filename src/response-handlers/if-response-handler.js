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
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import ResponseHandlerFactory from '../factories/response-handler-factory';

/**
 * Conditional response handler.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-18
 * @version 1.1
 * @since 0.1.0
 * @see {@link IfResponse}
 */
export default class IfResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Object} response - {@link IfResponse} instance.
   * @param {Object} user - {@link User} instance.
   * @param {object} api - (optional) transport library api.
   */
  constructor(options) {
    super(Object.assign({ type: 'if-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Calls `ok` if condition is truthy.
   * Calls `err` if condition is falsy and `err` is defined.
   */
  call(onResult) {
    const user = this.user;
    const r = this.response;
    const api = this.api;

    if (r.condition.call()) {
      const response = r.ok;
      const handler = ResponseHandlerFactory.getHandler({ response, user, api });
      handler.call(onResult);
    } else if (r.err) {
      const response = r.err;
      const handler = ResponseHandlerFactory.getHandler({ response, user, api });
      handler.call(onResult);
    } else {
      onResult();
    }
  }
}
