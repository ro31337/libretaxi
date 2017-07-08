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
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import UserStateResponse from '../../responses/user-state-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import If from '../../responses/if-response';
import In from '../../conditions/in';
import ErrorResponse from '../../responses/error-response';

/**
 * Select user type menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectUserType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'select-user-type' }, options));
  }

  /**
   * Return text and list of available user types.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('who_you_are') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.t('driver'), value: 'driver' }],
          [{ label: this.t('passenger'), value: 'passenger' }],
        ],
      }));
  }

  /**
   * Conditionally set selected user type and redirect.
   *
   * @return {IfResponse} response - return conditional response
   */
  post(value) {
    return new If({
      condition: new In(value, ['driver', 'passenger']),
      ok: new CompositeResponse()
        .add(new UserStateResponse({ userType: value }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'request-phone' })),
      err: new ErrorResponse({ message: this.gt('error_try_again') }),
    });
  }
}
