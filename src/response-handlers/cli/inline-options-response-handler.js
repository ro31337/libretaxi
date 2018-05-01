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
import hotkeys from '../../cli-hotkeys';
import InlineButtonCallback from '../common/inline-button-callback';

/**
 * Inline options response cli handler.
 * Print {@link InlineOptionsResponse} buttons and their hotkeys to console, set callbacks
 * for these hotkeys.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-10-10
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
    super(Object.assign({ type: 'cli-inline-options-response-handler' }, options));
    this.user = options.user;
  }

  /**
   * Handler entry point.
   * Print the list of options and their corresponding hotkeys to console,
   * set callbacks for each hotkey. When hotkey is pressed, new "call action" message is
   * posted to the queue. Parameters for `queue.create` call are just parsed button value
   * (from stringified json). See {@link DriverOrderNew} for example.
   */
  call(onResult) {
    hotkeys.clearAll();

    const ss = [];
    let i = 0;

    for (const row of this.response.rows) {
      for (const o of row) {
        const key = 'QWERTYUIOP'[i];
        ss.push(`[${o.label}] (^${key})`);
        hotkeys.set(key, new InlineButtonCallback({ user: this.user, value: o.value }));
        i++;
      }
    }

    console.log(ss.join(', '));
    onResult();
  }
}
