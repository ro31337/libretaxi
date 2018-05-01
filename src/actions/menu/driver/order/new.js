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
import MapResponse from '../../../../responses/map-response';
import InterruptPromptResponse from '../../../../responses/interrupt-prompt-response';
import RedirectResponse from '../../../../responses/redirect-response';
import MetricDistance from '../../../../decorators/distance/metric-distance';
import InlineOptionsResponse from '../../../../responses/inline-options-response';
import If from '../../../../responses/if-response';
import ZeroPrice from '../../../../conditions/zero-price';
import inlineButtons from './buttons/inline-buttons';
import HistoryHash from '../../../../support/history-hash';
import UserStateResponse from '../../../../responses/user-state-response';

/**
 * Notify driver about new order.
 * Called from outside by {@link NotifyDriversResponseHandler}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-30
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverOrderNew extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-order-new' }, options));
  }

  /**
   * Notify driver about order the following way:
   * - interrupt current prompt (for CLI only)
   * - show inline buttons (and set callbacks)
   * - show order details
   * - redirect back to `driver-index`
   *
   * @param {object} args - hash of parameters
   * @param {number} args.distance - distance to passenger (in km)
   * @param {Array} args.from - passenger location, for example `[37.421955, -122.084058]`
   * @param {string} args.to - passenger destination (can contain passenger random comments)
   * @param {string} args.passengerKey - passenger key
   * @param {string} args.orderKey - order key
   * @return {CompositeResponse} - composite response
   */
  call(args) {
    const buttons = inlineButtons(args, this.user);
    const inlineValues = {}; // key-value where key is `guid`, value is `response`
    Object.keys(buttons).forEach((k) => { inlineValues[buttons[k].guid] = buttons[k].response; });

    return new CompositeResponse()
      .add(new InterruptPromptResponse())
      .add(new UserStateResponse({
        inlineValues: new HistoryHash(this.user.state.inlineValues).merge(inlineValues),
      }))
      .add(new TextResponse({ message: this.t('new_order') }))
      .add(new TextResponse({ message: this.t('distance',
        new MetricDistance(this.i18n, args.distance).toString()) }))
      .add(new MapResponse({ location: args.from }))
      .add(new TextResponse({ message: this.t('to', args.to) }))
      .add(new If({
        condition: new ZeroPrice(args.price),
        ok: new TextResponse({ message: this.t('price_not_set') }),
        err: new TextResponse({ message: this.t('price', args.price) }),
      }))
      .add(new TextResponse({ message: this.t('call_to_action') }))
      .add(new If({
        condition: new ZeroPrice(args.price),
        ok: new InlineOptionsResponse({
          rows: [
            [{ label: this.t('set_my_price'), value: buttons.setMyPrice.guid }],
          ],
          defaultMessage: this.gt('default_inline_options_message'),
        }),
        err: new InlineOptionsResponse({
          rows: [
            [
              { label: this.t('send_my_number'), value: buttons.sendMyNumber.guid },
              { label: this.t('set_my_price'), value: buttons.setMyPrice.guid },
            ],
          ],
          defaultMessage: this.gt('default_inline_options_message'),
        }),
      }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
