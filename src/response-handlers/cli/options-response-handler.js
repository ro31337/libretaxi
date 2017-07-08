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
 * Options response cli handler.
 * Prints the list of options for {@link OptionsResponse} to the console and
 * allows user to select the value from the list. Calls onResult callback
 * with selected value.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-14
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} options - see {@link ResponseHandler}
   * @param {Object} options.lib - dependency injection of console library
   */
  constructor(options) {
    super(Object.assign({ type: 'cli-options-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Displays the list of options to the console.
   * @param {function} onResult - this callback will be executed on user
   * choice with selected value as callback parameter.
   */
  call(onResult) {
    // flatten array of rows into the single list and
    // replace `label` with `name`
    const choices = [];

    for (const row of this.response.rows) {
      for (const o of row) {
        choices.push({ name: o.label, value: o.value });
      }
    }

    // use Inquirer library to show the list of options
    this.lib.prompt([
      {
        type: 'list',
        name: 'value',
        message: 'Your choice?',
        choices,
      },
    ]).then((result) => {
      if (result) onResult(result.value);
    }).catch((err) => {
      console.log(`Error in OptionsResponseHandler: ${err}`); // eslint-disable-line no-console
      onResult();
    });
  }
}
