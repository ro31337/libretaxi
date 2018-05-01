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
 * Metric distance.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-05
 * @version 1.1
 * @since 0.1.0
 */
export default class MetricDistance {

  /**
   * Constructor.
   *
   * @param {object} i18n - initialized i18n object
   * @param {number} distance - distance, in kilometers. Can be float. For example `7.738472`.
   */
  constructor(i18n, distance) {
    this.i18n = i18n;
    this.distance = distance;
  }

  /**
   * String representation of metric distance.
   *
   * @override
   * @return {string} - localized string, for example "7.7 km"
   */
  toString() {
    return this.i18n.__('metric-distance.km', this.distance.toFixed(1));
  }
}
