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
 * Select vehicle type for driver (menu action).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-30
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectVehicleType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-select-vehicle-type' }, options));
  }

  /**
   * Returns list of available vehivle types (motorbike, car).
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('select') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.t('car'), value: 'car' }],
          [{ label: this.t('motorbike'), value: 'motorbike' }],
        ],
      }));
  }

  /**
   * Saves `vehicleType` to user's state and redirects to action explaining checkins.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} + {@link UserStateResponse} + {@link RedirectResponse}
   * @return {ErrorResponse} when posted value is unknown
   */
  post(value) {
    const response = new CompositeResponse();

    switch (value) {
      case 'motorbike':
      case 'car':
        response.add(new TextResponse({ message: '👌 OK!' }));
        response.add(new UserStateResponse({ vehicleType: value }));
        response.add(new RedirectResponse({ path: 'driver-explain-checkins' }));
        break;
      default:
        response.add(new ErrorResponse({ message: this.t('error_only_known_type') }));
    }

    return response;
  }
}
