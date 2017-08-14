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

/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import PassengerVerifyLocation from '../../../src/actions/menu/passenger/verify-location';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new PassengerVerifyLocation({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new PassengerVerifyLocation({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('passenger-verify-location.verify_location'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'yes');
  t.is(response.responses[1].rows[1][0].value, 'no');
  t.is(response.responses[1].rows[0][0].label, i18n.__('global.yes'));
  t.is(response.responses[1].rows[1][0].label, i18n.__('global.no'));
  t.is(response.responses[1].defaultMessage, i18n.__('global.default_options_message'));
});

test('should return composite response on post', t => {
  const action = new PassengerVerifyLocation({ i18n, user });
  const response = action.post(31337);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'if');
  t.is(response.responses[0].condition.type, 'equals');
  t.is(response.responses[0].condition.actual, 31337);
  t.is(response.responses[0].condition.expected, 'yes');
  t.is(response.responses[0].ok.type, 'composite');
  t.is(response.responses[0].ok.responses[0].type, 'text');
  t.is(response.responses[0].ok.responses[0].message, '👌 OK!');
  t.is(response.responses[0].ok.responses[1].type, 'redirect');
  t.is(response.responses[0].ok.responses[1].path, 'passenger-request-destination');
  t.falsy(response.responses[0].err);

  t.is(response.responses[1].type, 'if');
  t.is(response.responses[1].condition.type, 'equals');
  t.is(response.responses[1].condition.actual, 31337);
  t.is(response.responses[1].condition.expected, 'no');
  t.is(response.responses[1].ok.type, 'composite');
  t.is(response.responses[1].ok.responses[0].type, 'text');
  t.is(response.responses[1].ok.responses[0].message, i18n.__('passenger-verify-location.try_with_paperclip'));
  t.is(response.responses[1].ok.responses[1].type, 'redirect');
  t.is(response.responses[1].ok.responses[1].path, 'passenger-request-location');
  t.falsy(response.responses[1].err);

  t.is(response.responses[2].type, 'if');
  t.is(response.responses[2].condition.type, 'not-in');
  t.is(response.responses[2].condition.value, 31337);
  t.deepEqual(response.responses[2].condition.arr, ['yes', 'no']);
  t.truthy(response.responses[2].ok);
  t.falsy(response.responses[2].err);
});
