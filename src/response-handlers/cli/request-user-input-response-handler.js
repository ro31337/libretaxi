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
import inquirer from 'inquirer';

/**
 * "Request user input" response cli handler.
 * Prompts user to type a message.
 * See also: {@link RequestUserInputResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-11
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestUserInputResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-request-user-input-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Prompts the user to type a message.
   */
  call(onResult) {
    const q = [
      {
        type: 'input',
        name: 'message',
        message: 'Your input:',
      },
    ];
    this.lib.prompt(q).then((data) => {
      onResult(data.message);
    }).catch((err) => {
      console.log(`Error in RequestUserInputResponseHandler: ${err}`); // eslint-disable-line no-console, max-len
      onResult();
    });
  }
}
