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

/* eslint-disable no-new, no-console, arrow-body-style */
import test from 'ava';
import InlineButtonCallback from '../../../src/response-handlers/common/inline-button-callback'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
import ResponseHandlerFactory from '../../../src/factories/response-handler-factory';

checkNotNullTest(['value', 'user'], (args) => { new InlineButtonCallback(args); });

test('can be constructed with default parameters', t => {
  const cb = new InlineButtonCallback({ value: { foo: 'bar' }, user: {} });
  t.is(cb.type, 'inline-button-callback');
  t.deepEqual(cb.value, { foo: 'bar' });
  t.truthy(cb.user);
});

test.cb('should execute handler on call', t => {
  ResponseHandlerFactory.getHandler = () => { return { call: () => t.end() }; };
  const response = { type: 'empty', userKey: 'cli_1' };
  const user = { state: {} };
  const cb = new InlineButtonCallback({ value: response, user });
  cb.call();
});
