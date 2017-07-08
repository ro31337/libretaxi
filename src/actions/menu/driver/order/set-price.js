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

import Action from '../../../../action';
import CompositeResponse from '../../../../responses/composite-response';
import TextResponse from '../../../../responses/text-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';
import RequestUserInputResponse from '../../../../responses/request-user-input-response';
import CallActionResponse from '../../../../responses/call-action-response';

/**
 * Ask driver to set the price for new order.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-27
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverOrderSetPrice extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-order-set-price' }, options));
  }

  /**
   * Interrupt current prompt (if any) and ask for the price and details.
   */
  get() {
    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new TextResponse({ message: this.t('set_price') }))
      .add(new RequestUserInputResponse());
  }

  /**
   * Interrupt current prompt (if any), call action to inform passenger, redirect back to
   * driver index action.
   *
   * @param {string} value - driver price, can contain random details
   */
  post(value) {
    const arg = this.user.state.redirectArgs;
    return new CompositeResponse()
      .add(new CallActionResponse({
        userKey: arg.passengerKey,
        route: 'passenger-contact-driver-price',
        kicker: { menuLocation: 'order-submitted', currentOrderKey: arg.orderKey },
        arg: {
          distance: arg.distance,
          driverPhone: this.user.state.phone,
          price: value,
          driverIdentity: this.user.state.identity || {},
        },
      }))
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
