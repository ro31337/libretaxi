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

import OptionsMap from './options-map';
import ActionFactory from '../factories/action-factory';

/**
 * @typedef textToValue
 *
 * Convert submitted text to it's value. Useful helper for Telegram keyboard. Because of
 * Telegram platform limitations we cannot bind values to keyboard buttons (only to inline
 * keyboards). So this helper resolves button value based on:
 * - Button text
 * - Current user menu location
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-05
 * @version 1.1
 * @since 0.1.0
 */
export default (user, text) => { // eslint-disable-line
  const route = user.state.menuLocation || 'default';
  const action = ActionFactory.fromRoute({ route, user });
  const response = action.call();
  const map = new OptionsMap({ response }).parse();
  return map[text] || text;
};
