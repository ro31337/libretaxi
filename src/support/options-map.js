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

import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null';

/**
 * Options map. Support class to build label-value map from response expression. Useful for
 * telegram platform when using {@link OptionsResponse}, because telegram doesn't support
 * values in keyboard buttons, so we have to look them up based on provided text.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-03
 * @see https://github.com/ro31337/libretaxi/issues/301
 * @see https://github.com/ro31337/libretaxi/issues/300
 * @extends checkNotNull
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsMap extends mix(class {}).with(checkNotNull('response')) {
  /**
   * Constructor.
   *
   * @param {Response} options.response - response instance. Any type (can be also json), but only
   * {@link CompositeResponse} and {@link OptionsResponse} are supported. Other types are ignored.
   */
  constructor(options) {
    super(options);
    this.response = options.response;
  }

  /**
   * Parse response and return key-value map where:
   * key - `label` from {@link OptionsResponse}
   * value - `value` from {@link OptionsResponse}
   * @throws {Error} throw error when labels are not unique.
   * @returns {object} map - Message of specific type, see {@link Response},
   */
  parse() {
    const map = {};
    this.parseNode(this.response, map);
    return map;
  }

  /**
   * Parse node.
   *
   * @private
   */
  parseNode(current, map) {
    if (current.type === 'options') {
      this.parseOptions(current, map);
    }
    if (current.type === 'composite') {
      this.parseComposite(current, map);
    }
    if (current.type === 'if') {
      this.parseIf(current, map);
    }
  }

  /**
   * Parse {@link OptionsResponse} node.
   *
   * @private
   */
  parseOptions(current, map) {
    for (const row of current.rows) {
      for (const o of row) {
        map[o.label] = o.value; // eslint-disable-line no-param-reassign
      }
    }
  }

  /**
   * Parse {@link CompositeResponse} node, recursively parse subnodes.
   *
   * @private
   */
  parseComposite(current, map) {
    for (const response of current.responses) {
      this.parseNode(response, map);
    }
  }

  /**
   * Parse {@link IfResponse} node, recursively parse subnodes.
   *
   * @private
   */
  parseIf(current, map) {
    if (current.ok) this.parseNode(current.ok, map);
    if (current.err) this.parseNode(current.err, map);
  }
}
