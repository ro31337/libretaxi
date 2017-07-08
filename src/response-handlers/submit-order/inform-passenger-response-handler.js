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

import ResponseHandler from '../response-handler';
import CaQueue from '../../queue/ca-queue';

/**
 * Informs passenger that order has been submitted.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-09-15
 * @version 1.1
 * @since 0.1.0
 */
export default class InformPassengerResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link InformPassengerResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'inform-passenger-response-handler' }, options));
    this.queue = new CaQueue();
  }

  /**
   * Handler entry point. Informs passenger by posting redirect to `order-submitted` route.
   * Calls `onResult` when saved.
   */
  call(onResult) {
    this.queue.redirect({
      userKey: this.response.passengerKey,
      route: 'order-submitted',
    });
    onResult();
  }
}
