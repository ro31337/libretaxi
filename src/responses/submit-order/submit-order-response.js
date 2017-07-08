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

import CompositeResponse from '../composite-response';
import SaveOrderResponse from './save-order-response';
import InformPassengerResponse from './inform-passenger-response';
import NotifyDriversResponse from './notify-drivers-response';

/**
 * Submit order response.
 * Composite resposnse that contains:
 * - {@link SaveOrderResponse}
 * - {@link InformPassengerResponse}
 * - {@link NotifyDriversResponse}
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CompositeResponse}
 * @date 2016-09-15
 * @version 1.2
 * @since 0.1.0
 */
export default class SubmitOrderResponse extends CompositeResponse {
  /**
   * Constructor.
   */
  constructor(options) {
    super();
    this.add(new SaveOrderResponse(options));
    this.add(new InformPassengerResponse(options));
    this.add(new NotifyDriversResponse(options));
  }
}
