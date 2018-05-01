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
import telegramErrors from './telegram-errors';

/**
 * "Request phone" response Telegram handler.
 * Prompts user to send phone number with the button.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-12
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhoneResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-request-phone-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prompts the user to send phone number.
   */
  call() {
    const message = this.response.message || 'Send number by clicking the button below';
    const buttonText = this.response.buttonText || 'Send number';
    this.api.sendMessage(this.user.platformId, message,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({
          keyboard: [[{ text: buttonText, request_contact: true }]],
          one_time_keyboard: true,
        }),
      }).catch(telegramErrors);
  }
}
