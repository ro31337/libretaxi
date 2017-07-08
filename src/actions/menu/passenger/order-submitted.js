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
import TextResponse from '../../../responses/text-response';
import CompositeResponse from '../../../responses/composite-response';
import OptionsResponse from '../../../responses/options-response';
import CancelCurrentOrderResponse from '../../../responses/cancel-current-order-response';
import RedirectResponse from '../../../responses/redirect-response';
import ErrorResponse from '../../../responses/error-response';

/**
 * Order submitted action. Used to inform the passenger that order
 * has been submitted, and redirects passenger from the blank screen.
 * To be used in {@link SubmitOrderResponseHandler}. Implements `call` method
 * (the same handler for `get` and `post`).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-20
 * @version 1.1
 * @since 0.1.0
 */
export default class OrderSubmitted extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'order-submitted' }, options));
  }

  /**
   * Returns text message and temporarily redirects to `foo`.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link RedirectResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('order_submitted') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('cancel'), value: 'cancel' },
          ],
        ],
      }));
  }

  /**
   * Cancels current order and redirects to `blank-screen`. If input is incorrect,
   * returns error.
   *
   * @return {CompositeResponse} - containing {@link CancelCurrentOrderResponse}
   * and {@link RedirectResponse}
   * @return {ErrorResponse} - when input is incorrect
   */
  post(value) {
    if (value === 'cancel') {
      return new CompositeResponse()
        .add(new CancelCurrentOrderResponse())
        .add(new RedirectResponse({ path: 'blank-screen' }));
    }
    return new ErrorResponse({ message: this.t('error_incorrect_input') });
  }
}
