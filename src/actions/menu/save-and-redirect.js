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
import RedirectResponse from '../../responses/redirect-response';
import CompositeResponse from '../../responses/composite-response';
import UserStateResponse from '../../responses/user-state-response';

/**
 * Redirect menu action, redirects to another action and saves arguments in user state.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-18
 * @version 1.1
 * @since 0.1.0
 */
export default class SaveAndRedirect extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'save-and-redirect' }, options));
  }

  /**
   * Save args in user state and redirect to `args.path`.
   *
   * @param {object} args - hash of parameters
   * @param {string} args.path - path to new action
   * @return {RedirectResponse} Returns instance of {@link RedirectResponse}
   */
  call(args) {
    return new CompositeResponse()
      .add(new UserStateResponse({ redirectArgs: args }))
      .add(new RedirectResponse({ path: args.path }));
  }
}
