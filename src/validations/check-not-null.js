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

import { Mixin } from 'mixwith';
import { ArgumentError } from './errors';

/**
 * @typedef checkNotNull
 *
 * Validation mixin for null or empty constructor parameters.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-12
 * @version 1.1
 * @since 0.1.0
 * @param {string|Array} props - string or list of string to check for null
 * @throws {ArgumentError} throw argument error when parameter(s) null
 * @example
 * import checkNotNull from './check-not-null.js';
 * class Foo extends mix(class {}).with(checkNotNull('bar')) {
 *   constructor(options) { super(options); }
 * }
 * @example
 * import checkNotNull from './check-not-null.js';
 * class Foo extends mix(class {}).with(checkNotNull(['bar', 'buz'])) {
 *   constructor(options) { super(options); }
 * }
 */
module.exports = (props) => { // eslint-disable-line arrow-body-style
  return Mixin((s) => class extends s { // eslint-disable-line
    constructor(options) {
      super(options);

      if (!options) {
        throw new ArgumentError('parameters not specified');
      }

      // #82 - if no parameters provided to `checkNotNull` then we should
      // just check if constructor options specified.
      if (!props) {
        return;
      }

      const validate = (prop) => {
        if (!options[prop]) {
          throw new ArgumentError(`'${prop}' parameter not specified`);
        }
      };

      if (props instanceof Array) {
        for (let i = 0; i < props.length; i++) {
          validate(props[i]);
        }
      } else {
        validate(props);
      }
    }
  });
};
