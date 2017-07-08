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
 * Text response telegram handler.
 * Prints {@link TextResponse} message to telegram.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-01
 * @version 1.1
 * @since 0.1.0
 */
export default class TextResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-text-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prints the message to telegram.
   */
  call(onResult) {
    const message = this.response.message || '';
    this.api.sendMessage(this.user.platformId, message,
      {
        disable_notification: !message.includes('🔔'),
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      }).catch(console.log.bind(console));
    onResult();
  }
}
