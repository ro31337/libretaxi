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
 * "Request phone" response cli handler.
 * Prompts user to type phone number.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhoneResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-request-phone-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Prompts the user to type phone number.
   */
  call(onResult) {
    const q = [
      {
        type: 'input',
        name: 'phone',
        message: 'Your phone number',
        default: '(555) 111-22-33',
      },
    ];
    this.lib.prompt(q).then((answers) => {
      onResult(answers.phone);
    }).catch((err) => {
      console.log(`Error in RequestPhoneResponseHandler: ${err}`); // eslint-disable-line no-console
      onResult();
    });
  }
}
