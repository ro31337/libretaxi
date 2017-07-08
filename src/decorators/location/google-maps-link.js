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

/**
 * Google maps link.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-05
 * @version 1.1
 * @since 0.1.0
 */
export default class GoogleMapsLink {

  /**
   * Constructor.
   *
   * @param {Array} location - latitute longitude location, for example `[37.421955, -122.084058]`
   */
  constructor(location) {
    this.location = location;
  }

  /**
   * String representation of google maps link.
   *
   * @override
   * @return {string} - link to google maps
   */
  toString() {
    return `https://www.google.com/maps?q=${this.location[0]},${this.location[1]}`;
  }
}
