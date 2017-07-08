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

import Action from '../../action';
import EmptyResponse from '../../responses/empty-response';

/**
 * Blank screen menu action. Does nothing, there is no way to get out of
 * this menu action. User can be redirected only from outside (i.e. another
 * action was executed as result of some kind of event).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-26
 * @version 1.1
 * @since 0.1.0
 */
export default class BlankScreen extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'blank-screen' }, options));
  }

  /**
   * Returns empty response.
   *
   * @return {EmptyResponse} - returns empty response
   */
  get() {
    return new EmptyResponse();
  }

  /**
   * Returns empty response.
   *
   * @return {EmptyResponse} - returns empty response
   */
  post() {
    return new EmptyResponse();
  }
}
