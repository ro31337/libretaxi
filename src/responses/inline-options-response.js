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
import ValidatedOptionsResponse from '../validations/validated-options-response';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Inline options response is response that contains rows of options. Each row is
 * array. Each option in the row is object with `label` and `value` properties
 * set.
 *
 * Works the same way as {@link OptionsResponse}, the difference is that inline options response
 * is non-bloking, and buttons appear in message feed along with the other text. You can
 * think about inline options as of clickable text.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {ValidatedOptionsResponse}
 * @date 2016-10-09
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineOptionsResponse extends
  mix(Response).with(checkNotNull('rows'), ValidatedOptionsResponse) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.rows - Array of rows of options. Where each row is
   * array of objects. Each object must contain two properties: `label` and `value`.
   * @param {string} options.message - (optional) message to display before rendering the list
   * of options
   * @param {string} options.defaultMessage - (optional) same as `message`, but safe to replace
   * @example
   * const r = new InlineOptionsResponse({
   * 	rows: [
   * 		[{ label: 'One', value: '1' },{ label: 'Two', value: '2' },{ label: 'Three', value: '3' }],
   * 		[{ label: 'OK', value: 'ok' },{ label: 'Cancel', value: 'cancel' }]
   * 	]
   * });
   * // response above represents the following structure:
   * // row 1:   One  |   Two   | Three
   * // row 2:        OK   |   Cancel
   */
  constructor(options) {
    const opts = Object.assign({ type: 'inline-options' }, options);
    super(opts);
    Object.assign(this, opts);
  }
}
