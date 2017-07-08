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

/* eslint-disable max-len, no-multi-spaces */
import Action from '../../../action';
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import ErrorResponse from '../../../responses/error-response';
import If from '../../../responses/if-response';
import Equals from '../../../conditions/equals';
import NotIn from '../../../conditions/not-in';

/**
 * Driver index menu action. Can be interrupted when new order is placed.
 * See {@ NotifyDriversResponseHandler} for details.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-05
 * @version 1.1
 * @since 0.1.0
 */
export default class DriverIndex extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-index' }, options));
  }

  /**
   * Returns list of available options: checkin, [un-]mute, settings.
   *
   * @return {IfResponse} - conditional response with list of options
   */
  get() {
    return new If({
      condition: new Equals(this.user.state.muted, true),
      ok: new OptionsResponse({
        rows: [
          [{ label: this.t('checkin'), value: 'checkin' }],
          [{ label: this.t('unmute'), value: 'unmute' }],
          [{ label: this.t('settings'), value: 'settings' }],
        ],
        defaultMessage: this.gt('default_options_message'),
      }),
      err: new OptionsResponse({
        rows: [
          [{ label: this.t('checkin'), value: 'checkin' }],
          [{ label: this.t('mute'), value: 'mute' }],
          [{ label: this.t('settings'), value: 'settings' }],
        ],
        defaultMessage: this.gt('default_options_message'),
      }),
    });
  }

  /**
   * Redirects to another driver action based on provided value: checkin, mute, unmute, settings.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse} with conditions.
   */
  post(value) {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new If({ condition: new Equals(value, 'checkin'),  ok: new RedirectResponse({ path: 'driver-checkin' }) }))
      .add(new If({ condition: new Equals(value, 'mute'),     ok: new RedirectResponse({ path: 'driver-mute' }) }))
      .add(new If({ condition: new Equals(value, 'unmute'),   ok: new RedirectResponse({ path: 'driver-unmute' }) }))
      .add(new If({ condition: new Equals(value, 'settings'), ok: new RedirectResponse({ path: 'settings' }) }))
      .add(new If({
        condition: new NotIn(value, ['checkin', 'mute', 'unmute', 'settings']),
        ok: new ErrorResponse({ message: this.t('unknown_choice') }),
      }));
  }
}
