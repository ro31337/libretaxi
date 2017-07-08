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

/* eslint-disable no-console */
import ResponseHandler from '../response-handler';

/**
 * "Request location" response Telegram handler.
 * Prompts user to send location with the button.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-14
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestLocationResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-request-location-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prompts the user to send location.
   */
  call() {
    const message = this.response.message || 'Send location by clicking the button below';
    const buttonText = this.response.buttonText || 'Send location';
    this.api.sendMessage(this.user.platformId, message,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({
          keyboard: [[{ text: buttonText, request_location: true }]],
          one_time_keyboard: true,
        }),
      }).catch(console.log.bind(console));
  }
}
