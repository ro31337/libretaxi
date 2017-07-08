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
 * "Request location" response cli handler.
 * This handler prompts user to choose 1 of 5 pre-defined locations.
 * See also: {@link RequestLocationResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-04
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestLocationResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-request-location-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Prompts the user to choose location.
   */
  call(onResult) {
    const choices = [];

    // https://www.google.com/#newwindow=1&q=37.818293%2C+-122.478375
    choices.push({ name: 'Golden Gate Bridge', value: [37.818293, -122.478375] });

    // https://www.google.com/#newwindow=1&q=37.792863%2C+-122.396889
    choices.push({ name: 'Embarcadero BART station', value: [37.792863, -122.396889] });

    // https://www.google.com/#newwindow=1&q=37.664059%2C+-122.443742
    choices.push({ name: 'South San Francisco BART station', value: [37.664059, -122.443742] });

    // https://www.google.com/#newwindow=1&q=37.461088%2C+-122.139215
    choices.push({ name: 'IKEA East Palo Alto', value: [37.461088, -122.139215] });

    // https://www.google.com/#newwindow=1&q=37.421955%2C+-122.084058
    choices.push({ name: 'GooglePlex', value: [37.421955, -122.084058] });

    this.lib.prompt([
      {
        type: 'list',
        name: 'value',
        message: 'Your choice?',
        choices,
      },
    ]).then((result) => {
      onResult(result.value);
    }).catch((err) => {
      console.log(`Error in RequestLocationResponseHandler: ${err}`); // eslint-disable-line no-console, max-len
      onResult();
    });
  }
}
