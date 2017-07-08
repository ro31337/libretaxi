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
import GoogleMapsLink from '../../decorators/location/google-maps-link';

/**
 * Map response cli handler.
 * Prints google maps link from {@link MapResponse} to console.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-26
 * @version 1.1
 * @since 0.1.0
 */
export default class MapResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-map-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Print google maps link to console.
   */
  call(onResult) {
    console.log(new GoogleMapsLink(this.response.location).toString()); // eslint-disable-line no-console, max-len
    onResult();
  }
}
