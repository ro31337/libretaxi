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

/* eslint-disable arrow-body-style, no-console */
import ResponseHandler from '../response-handler';

/**
 * Inline options response Telegram handler.
 * Send {@link InlineOptionsResponse} buttons to user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-19
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineOptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @type Object
   * @param {User} options.user - user
   */
  constructor(options) {
    super(Object.assign({ type: 'telegram-inline-options-response-handler' }, options));
    this.user = options.user;
  }

  /**
   * Handler entry point.
   * Send the list of inline buttons to the user.
   */
  call(onResult) {
    // convert rows to Telegram compatible rows
    const rows = Array.from(this.response.rows, row => Array.from(row, (o) => {
      return {
        text: o.label,
        callback_data: o.value,
      };
    }));

    const message = this.response.message || this.response.defaultMessage || 'Your choice?';
    this.api.sendMessage(this.user.platformId, message,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({ inline_keyboard: rows }),
      }).catch(console.log.bind(console));

    onResult();
  }
}
