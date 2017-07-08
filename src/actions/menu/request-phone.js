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
import RequestPhoneResponse from '../../responses/request-phone-response';
import CompositeResponse from '../../responses/composite-response';
import UserStateResponse from '../../responses/user-state-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';

/**
 * Request phone menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-25
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhone extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'request-phone' }, options));
  }

  /**
   * Returns text and request for phone.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RequestPhoneResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('type_your_phone') }))
      .add(new RequestPhoneResponse({ buttonText: this.t('button_text') }));
  }

  /**
   * Shows OK, sets selected user's phone and redirects, based on `userType`:
   * - driver - to `driver-select-vehicle-type`
   * - passenger - to `passenger-index`
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   */
  post(value) {
    const response = new CompositeResponse()
      .add(new UserStateResponse({ phone: value }));

    switch (this.user.state.userType) {
      case 'driver':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new RedirectResponse({ path: 'driver-select-vehicle-type' }));
        break;
      case 'passenger':
        response.add(new TextResponse({ message: this.t('all_set') }));
        response.add(new RedirectResponse({ path: 'passenger-index' }));
        break;
      default:
        throw new Error('unsupported user type');
    }

    return response;
  }
}
