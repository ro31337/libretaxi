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

/**
 * "Interrupt input" response. Used to interrupt CLI (at the moment) user input.
 * Inquirer.js library provides nice options and you can select one of them. For example,
 * in {@link DriverIndex} menu action. But there should be way to interrupt this library, so
 * action from outside can happen. For example, there is new order, and we must redirect user
 * to another menu action (or just show a text). Here is when "interrupt input" response comes
 * into play.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-09-29
 * @version 1.1
 * @since 0.1.0
 */
export default class InterruptPromptResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    super({ type: 'interrupt-prompt' });
  }
}
