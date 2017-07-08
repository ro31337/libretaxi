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
import CompositeResponse from '../../responses/composite-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import OptionsResponse from '../../responses/options-response';
import If from '../../responses/if-response';
import Equals from '../../conditions/equals';
import { localeMap } from '../../validations/supported-locales';

/**
 * Confirm selected locale. If not confirmed, return back to locale selection.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-02-05
 * @version 1.1
 * @since 0.1.0
 */
export default class ConfirmLocale extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'confirm-locale' }, options));
  }

  /**
   * Response with text and yes/no options. Also, add ✅ and ❌ icons and English interpretation.
   *
   * @return {CompositeResponse} response
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: `${localeMap.get(this.user.state.locale)} ?` }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: `✅ ${this.gt('yes')}${this.yes()}`, value: 'yes' },
            { label: `❌ ${this.gt('no')}${this.no()}`, value: 'no' },
          ],
        ],
        defaultMessage: this.gt('default_options_message'),
      }));
  }

  /**
   * Check the answer and redirect back or forward.
   *
   * @param {String} value - yes/no value is expected
   * @return {CompositeResponse} response - redirect response to move forward (yes) or back (no).
   */
  post(value) {
    return new CompositeResponse()
      .add(new If({
        condition: new Equals(value, 'yes'),
        ok: new CompositeResponse()
          .add(new TextResponse({ message: '👌 OK!' }))
          .add(new RedirectResponse({ path: 'select-user-type' })),
      }))
      .add(new If({
        condition: new Equals(value, 'no'),
        ok: new RedirectResponse({ path: 'select-locale' }),
      }));
  }

  /**
   * Returns yes-button explanation if locale is not English.
   *
   * @private
   */
  yes() {
    if (this.user.state.locale !== 'en') return ' (Yes)';
    return '';
  }

  /**
   * Returns no-button explanation if locale is not English.
   *
   * @private
   */
  no() {
    if (this.user.state.locale !== 'en') return ' (No)';
    return '';
  }
}
