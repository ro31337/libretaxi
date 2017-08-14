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
import CallActionResponse from '../../src/responses/call-action-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'route'], (args) => { new CallActionResponse(args); });

test('can be constructed with default parameters', t => {
  new CallActionResponse({ userKey: 'cli_1', route: 'default' });
  t.pass();
});

test('can be constructed with optional parameters', t => {
  const r = new CallActionResponse({ userKey: 'cli_1', route: 'default', arg: { foo: 'bar' },
    kicker: {}, delay: 3000 });
  t.is(r.type, 'call-action');
  t.is(r.userKey, 'cli_1');
  t.is(r.route, 'default');
  t.deepEqual(r.arg, { foo: 'bar' });
  t.truthy(r.kicker);
  t.is(r.delay, 3000);
});
