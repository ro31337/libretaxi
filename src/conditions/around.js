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

import Condition from './condition';
import GeoPoint from 'geopoint';

const EARTH_RADIUS_KM = 6371.01;

/**
 * Around bounding box condition. Is point 1 around point 2 within this distance?
 * Note: this class has no validations. `call` method fails if invalid parameters provided. You may
 * want to combine this condition with {Location} and {All} conditions.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-08-11
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Around extends Condition {

  /**
   * Constructor.
   *
   * @param {Array} point1 - point to check (lat, lng)
   * @param {Array} point2 - bounding box point (lat, lng)
   * @param {Number} distance - distance for bounding box (in km)
   */
  constructor(point1, point2, distance) {
    super({ type: 'around' });
    this.point1 = point1;
    this.point2 = point2;
    this.distance = distance;
  }

  /**
   * Entry point for condition.
   * Checks if point1 is within the bounding box of point2.
   *
   * @returns {boolean} result - `true` if point1 is within the bounding box of point2, `false`
   * otherwise.
   */
  call() {
    const p1 = new GeoPoint(this.point1[0], this.point1[1]);
    const p2 = new GeoPoint(this.point2[0], this.point2[1]);
    const bb = p1.boundingCoordinates(this.distance, EARTH_RADIUS_KM, true);
    return p2.isInBoundingBox(bb);
  }
}
