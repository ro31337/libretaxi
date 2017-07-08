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
import checkNotNull from './validations/check-not-null.js';

/**
 * Action abstract class.
 * Represents menu action that can process commands and return {@link Response}.
 * Implementation must override the following methods:
 * `get` - entry point, must return {@link Response}
 * `post(value)` - method that accepts value, must return {@link Response}
 * `id` - action guid, must return string
 * `text` - action text id, must return string
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-08
 * @abstract
 * @extends checkNotNull
 * @version 1.1
 * @since 0.1.0
 */
export default class Action extends mix(class {}).with(checkNotNull(['i18n', 'type', 'user'])) {
  /**
   * Constructor.
   *
   * @param {string} options.i18n - initialized i18n object.
   * @param {string} options.type - type of action, used mostly for tests.
   * @param {string} options.state - (optional) command state.
   */
  constructor(options) {
    super(options);
    this.i18n = options.i18n;
    this.type = options.type;
    this.user = options.user;
    this.state = options.state ? options.state : {};
  }

  /**
   * Entry point to action. Executed without parameters as result of redirect.
   * Method can return text, set of buttons, image, etc.
   *
   * @returns {Response} response - Message of specific type, see {@link Response},
   * {@link TextResponse}, {@link OptionsResponse}, etc.
   * @example
   * get() {
   * 	return new OptionsResponse({
   * 		rows: [
   * 			[{ label: 'OK', value: 'ok' },{ label: 'Cancel', value: 'cancel' }]
   * 		]
   * 	});
   * }
   * // ...
   * console.log(action.get());
   */
  get() {
    throw new Error('not implemented');
  }

  /**
   * Posts parameters to action.
   * For example, if `get` returns {@link OptionsResponse}, `post` handles
   * the list of possible options, and based on provided value can redirect, display
   * message, etc.
   *
   * @param {string} value - Value as a string. Example: `ping`
   * @returns {Response} response - Message of specific type, see {@link Response},
   * {@link TextResponse}, {@link RedirectResponse}
   * @example
   * post(value) {
   * 	switch(value.toLowerCase()) {
   * 		case 'ok':
   * 			return new TextResponse('You selected OK');
   * 		case 'cancel':
   * 			return new TextResponse('You selected CANCEL');
   * 		default:
   * 			return new TextResponse('Command unknown');
   * 	}
   * }
   * // ...
   * console.log(action.post('ok'));
   */
  post(value) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }

  /**
   * Calls `get` (if `arg` is empty) or `post` (if `arg` is provided).
   * @param {string} arg - argument to action.
   * @returns {Response} response - Message of specific type, see {@link Response},
   * {@link TextResponse}, {@link RedirectResponse}
   */
  call(arg) {
    if (arg) {
      return this.post(arg);
    }
    return this.get();
  }

  /**
   * Translate token using current type
   */
  t(token, param) {
    return this.i18n.__(`${this.type}.${token}`, param);
  }

  /**
   * Translate token using global type
   */
  gt(token, param) {
    return this.i18n.__(`global.${token}`, param);
  }
}
