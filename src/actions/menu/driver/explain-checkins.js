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
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';

/**
 * Explain check-ins for driver (menu action).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-30
 * @version 1.1
 * @since 0.1.0
 */
export default class ExplainCheckins extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-explain-checkins' }, options));
  }

  /**
   * Returns explanation (on why do we need check-ins), and "Next" button.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('text') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('next'), value: 'next' },
          ],
        ],
      }));
  }

  /**
   * Shows "OK" and redirects to `driver-request-location`
   *
   * @return {CompositeResponse} - composite response with OK text and redirect
   */
  post() {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'driver-request-location' }));
  }
}
