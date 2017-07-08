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
 * Options response Telegram handler.
 * Send the list of options for {@link OptionsResponse} as keyboard to the client.
 * On Telegram side this allows a user to select the value from the list.
 * Important: This handler doesn't call onResult callback with selected value, result value
 * should be posted back to current menu action from the main Telegram loop.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-04
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} options - see {@link ResponseHandler}
   */
  constructor(options) {
    super(Object.assign({ type: 'telegram-options-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Send the list of options as keyboard to the client.
   */
  call() {
    // convert rows to Telegram compatible rows
    const rows = Array.from(this.response.rows, row => Array.from(row, o => o.label));

    const message = this.response.message || this.response.defaultMessage || 'Your choice?';
    this.api.sendMessage(this.user.platformId, message,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({ keyboard: rows, one_time_keyboard: true }),
      }).catch(console.log.bind(console));
  }
}
