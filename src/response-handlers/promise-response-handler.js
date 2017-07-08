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
 * Promise response handler.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2017-05-06
 * @version 1.1
 * @since 0.1.0
 * @see {@link PromiseResponse}
 */
export default class PromiseResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Object} response - {@link PromiseResponse} instance.
   * @param {Object} user - {@link User} instance.
   * @param {object} api - (optional) transport library api.
   */
  constructor(options) {
    super(Object.assign({ type: 'promise-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Calls `cb` if promise resolved.
   */
  call(onResult) {
    const { api, user } = this;
    this
      .response
      .promise
      .then((result) => {
        const handler = ResponseHandlerFactory.getHandler({
          response: this.response.cb(result),
          user,
          api,
        });
        handler.call(onResult);
      });
  }
}
