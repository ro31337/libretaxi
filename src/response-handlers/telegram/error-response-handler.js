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
 * Error response telegram handler.
 * Send message from {@link ErrorResponse} to Telegram user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-16
 * @version 1.1
 * @since 0.1.0
 */
export default class ErrorResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-error-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Send message prefixed with ❌ to Telegram user.
   */
  call(onResult) {
    this.api.sendMessage(this.user.platformId, `❌ ${this.response.message}`,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      }).catch(console.log.bind(console));
    onResult();
  }
}
