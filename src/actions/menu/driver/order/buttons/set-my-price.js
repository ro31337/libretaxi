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

import CallActionResponse from '../../../../../responses/call-action-response';
import checkNotNull from '../../../../../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * "Set my price" button (response). Calls {@link SaveAndRedirect} menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CallActionResponse}
 * @date 2016-10-27
 * @version 1.1
 * @since 0.1.0
 */
export class SetMyPrice extends
  mix(CallActionResponse).with(checkNotNull(['userKey', 'arg'])) {
  /**
  * Constructor.
  *
  * @param {object} options - hash of parameters
  * @param {string} options.userKey - redirect will be executed for this user
  * @param {object} options.arg - hash of parameters for {@link SaveAndRedirect}
  * @param {string} options.arg.passengerKey - passenger user key
  * @param {string} options.arg.orderKey - order key
  * @param {number} options.arg.distance - distance to driver
  * @param {number} options.arg.path - redirect path
  */
  constructor(options) {
    super(Object.assign({
      route: 'save-and-redirect',
      kicker: { menuLocation: 'driver-index' },
    }, options));
  }
}

/**
 * @typedef setMyPrice
 *
 * Set my price factory method. Creates instance of {@link SetMyPrice} based on
 * provided parameters. This will redirect driver to menu action where s/he can set the price.
 *
 * @param {object} args - hash of parameters
 * @param {string} args.passengerKey - passenger user key
 * @param {number} args.distance - distance from driver to passenger
 * @param {User} driver - driver user object
 * @return {string} instance - stringified instance of "set my price button" response
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-27
 * @version 1.1
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return new SetMyPrice({
    userKey: driver.userKey,
    arg: {
      passengerKey: args.passengerKey,
      orderKey: args.orderKey,
      distance: args.distance,
      path: 'driver-order-set-price',
    },
  });
};
