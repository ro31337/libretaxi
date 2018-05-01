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
import RequestLocationResponse from '../../../responses/request-location-response';
import CompositeResponse from '../../../responses/composite-response';
import UpdateLocationResponse from '../../../responses/update-location-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import If from '../../../responses/if-response';
import Location from '../../../conditions/location';
import ErrorResponse from '../../../responses/error-response';

/**
 * Driver request location menu action.
 * Asking driver to provide location.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-04
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverRequestLocation extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-request-location' }, options));
  }

  /**
   * Returns `text` and `request location` responses.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RequestLocationResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('provide_location') }))
      .add(new RequestLocationResponse({ buttonText: this.gt('location_button_text') }));
  }

  /**
   * If location is valid, save user location to database, reply with OK message, and
   * redirect to `explain-whats-next` menu action.
   *
   * @param {Array} value - array of two elements that represents location, for
   * example: `[37.421955, -122.084058]`
   * @return {IfResponse} response - instance of conditional response
   */
  post(value) {
    return new If({
      condition: new Location(value),
      ok: new CompositeResponse()
        .add(new UpdateLocationResponse({ location: value }))
        .add(new UserStateResponse({ location: value }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'driver-request-radius' })),
      err: new ErrorResponse({ message: this.gt('error_location') }),
    });
  }
}
