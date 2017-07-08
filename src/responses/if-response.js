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

import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Conditional response.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {Response}
 * @date 2016-09-09
 * @version 1.1
 * @since 0.1.0
 */
export default class IfResponse extends
  mix(Response).with(checkNotNull(['condition', 'ok'])) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Object} options.condition - instance of {@link Condition} class
   * @param {Response} options.ok - response to be called when condition truthy
   * @param {Response} options.err - (optional) response to be called when condition falsy
   * @example
   * const r = new IfResponse({
   *  condition: new Equals(2 + 2, 4),
   *  ok: new TextResponse('Universe is stable'),
   *  err: new TextResponse('Universe is highly unstable'),
   * });
   * @example
   * const r = new IfResponse({
   *  condition: new In(value, ['one', 'two', 'three']),
   *  ok: new TextResponse('You\'re good to go!'),
   * });
   * @example
   * const r = new IfResponse({
   *  condition: new AllSystemsAreGood(),
   *  ok: new TextResponse('You\'re good to go!'),
   * });
   */
  constructor(options) {
    const opts = Object.assign({ type: 'if' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
