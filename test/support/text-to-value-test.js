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

/* eslint-disable no-new */
import test from 'ava';
import textToValue from '../../src/support/text-to-value';
import ActionFactory from '../../src/factories/action-factory';
import Action from '../../src/action';
import OptionsResponse from '../../src/responses/options-response';

class Foo extends Action {
  constructor(options) {
    super(Object.assign({ type: 'foo' }, options));
  }

  get() {
    return new OptionsResponse({ rows: [
      [{ label: 'OK', value: '_ok_' }, { label: 'Cancel', value: '_cancel_' }],
    ] });
  }

  post() {
    return new OptionsResponse({ rows: [
      [{ label: 'OK2', value: '_ok2_' }, { label: 'Cancel2', value: '_cancel2_' }],
    ] });
  }
}

const user = { state: {} };

test('should convert text to value for the action', t => {
  ActionFactory.fromRoute = () => new Foo({ i18n: {}, user });
  t.is(textToValue(user, 'OK'), '_ok_');
  t.is(textToValue(user, 'Cancel'), '_cancel_');
  t.is(textToValue(user, 'OK2'), 'OK2'); // should ignore post method
  t.is(textToValue(user, 'Cancel2'), 'Cancel2'); // should ignore post method
  t.is(textToValue(user, 'foo'), 'foo');
});
