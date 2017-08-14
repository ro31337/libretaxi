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

/* eslint-disable no-new, no-console */
import test from 'ava';
import CompositeResponseHandler from '../../src/response-handlers/composite-response-handler';
import CompositeResponse from '../../src/responses/composite-response';
import TextResponse from '../../src/responses/text-response';

test('can be constructed with default parameters', t => {
  const h = new CompositeResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'composite-response-handler');
  t.pass();
});

test('can be constructed with default parameters and api', t => {
  const h = new CompositeResponseHandler({ response: {}, user: {}, api: { foo: 'bar' } });
  t.is(h.type, 'composite-response-handler');
  t.deepEqual(h.api, { foo: 'bar' });
});

test.cb('executes all response handlers', t => {
  let result = '';
  const user = { platformType: 'cli' };
  const r1 = new TextResponse({ message: 'one' });
  const r2 = new TextResponse({ message: 'two' });
  const r3 = new TextResponse({ message: 'three' });
  const tmp = console.log;
  console.log = (arg) => {
    result += arg;
  };

  const response = new CompositeResponse()
    .add(r1)
    .add(r2)
    .add(r3);

  const h = new CompositeResponseHandler({ response, user });
  h.call(() => {
    t.is(result, 'onetwothree');
    console.log = tmp;
    t.end();
  });
});
