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
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import OptionsResponse from '../../../responses/options-response';
import If from '../../../responses/if-response';
import NotIn from '../../../conditions/not-in';
import Equals from '../../../conditions/equals';

/**
 * Ask passenger to manually verify location. If location is not correct, redirect back
 * with instructions how to fix that.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-08
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerVerifyLocation extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-verify-location' }, options));
  }

  /**
   * Response with text and yes/no options.
   *
   * @return {CompositeResponse} response
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('verify_location') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.gt('yes'), value: 'yes' }],
          [{ label: this.gt('no'), value: 'no' }],
        ],
        defaultMessage: this.gt('default_options_message'),
      }));
  }

  /**
   * Check the answer and redirect back or forward. Render `get` action if answer is unknown.
   *
   * @param {String} value - yes/no value is expected
   * @return {CompositeResponse} response - return redirect response or re-render get action.
   */
  post(value) {
    return new CompositeResponse()
      .add(new If({
        condition: new Equals(value, 'yes'),
        ok: new CompositeResponse()
          .add(new TextResponse({ message: '👌 OK!' }))
          .add(new RedirectResponse({ path: 'passenger-request-destination' })),
      }))
      .add(new If({
        condition: new Equals(value, 'no'),
        ok: new CompositeResponse()
          .add(new TextResponse({ message: this.t('try_with_paperclip') }))
          .add(new RedirectResponse({ path: 'passenger-request-location' })),
      }))
      .add(new If({ condition: new NotIn(value, ['yes', 'no']), ok: this.get() }));
  }
}
