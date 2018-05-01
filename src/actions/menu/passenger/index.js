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
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import UserStateResponse from '../../../responses/user-state-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import ErrorResponse from '../../../responses/error-response';

/**
 * Passenger index: asks to choose taxi type.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-28
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerIndex extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-index' }, options));
  }

  /**
   * Returns list of available taxi types (bike and car) + settings button.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('choose_taxi_type') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.t('car'), value: 'car' }],
          [{ label: this.t('motorbike'), value: 'motorbike' }],
          [{ label: this.t('s'), value: 'settings' }],
        ],
        defaultMessage: this.gt('default_options_message'),
      }));
  }

  /**
   * Saves requested vehicle type to user's state and redirects to request location action.
   * When settings is picked, redirects to settings.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which is one of the following combinations:
   * - {@link TextResponse} + {@link UserStateResponse} + {@link RedirectResponse}
   * - {@link RedirectResponse}
   */
  post(value) {
    const response = new CompositeResponse();

    switch (value) {
      case 'motorbike':
      case 'car':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new UserStateResponse({ requestedVehicleType: value }));
        response.add(new RedirectResponse({ path: 'passenger-verify-cash' }));
        break;
      case 'settings':
        response.add(new RedirectResponse({ path: 'settings' }));
        break;
      default:
        response.add(new ErrorResponse({ message: this.t('error_only_known_type') }));
    }

    return response;
  }
}
