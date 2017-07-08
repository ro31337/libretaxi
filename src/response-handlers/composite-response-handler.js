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
import log from '../log';

/**
 * Composite response handler.
 * Iterate through {@link CompositeResponse} and execute handler for each response.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-16
 * @version 1.1
 * @since 0.1.0
 */
export default class CompositeResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {object} response - {@link CompositeResponse} instance.
   * @param {object} user - {@link User} instance.
   * @param {object} api - (optional) transport library api.
   */
  constructor(options) {
    super(Object.assign({ type: 'composite-response-handler' }, options));
  }

  /**
   * Iterate through {@link CompositeResponse} and execute handler for each response.
   *
   * @param {function} onResult - result callback, passed to every handler. Executed only when
   * every handler in the chain executed its callback. Note that handlers for some platforms
   * do not execute callbacks. For example, {@link TelegramOptionsResponseHandler}.
   * @param {number} index - (optional) current index
   * @param {number} v - (optional) current value, used for recursively iterating through responses
   */
  call(onResult, index, v) {
    const i = index || 0;

    if (i >= this.response.responses.length) {
      onResult(v);
      return;
    }

    const user = this.user;
    const api = this.api;
    const response = this.response.responses[i];
    log.debug(`response type: ${response.type}`);

    const handler = ResponseHandlerFactory.getHandler({ response, user, api });
    log.debug(`handler type: ${handler.type}`);

    handler.call((retVal) => {
      this.call(onResult, i + 1, retVal || v);
    });
  }
}
