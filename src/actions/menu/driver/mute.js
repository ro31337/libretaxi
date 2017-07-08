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

import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import UserStateResponse from '../../../responses/user-state-response';

/**
 * Mute notifications menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-08
 * @version 1.1
 * @since 0.1.0
 */
export default class Mute extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-mute' }, options));
  }

  /**
   * Mutes notifications by updating `user.state.muted` to `true`.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains:
   * - {@link UserStateResponse} - updates user state
   * - {@link TextResponse} - shows OK message with short explanation
   * - {@link RedirectResponse} - redirects to `driver-index`
   */
  call() {
    return new CompositeResponse()
      .add(new UserStateResponse({ muted: true }))
      .add(new TextResponse({ message: this.t('mute_ok') }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
