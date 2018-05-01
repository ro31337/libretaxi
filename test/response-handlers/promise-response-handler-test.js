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
import PromiseResponseHandler from '../../src/response-handlers/promise-response-handler';
import PromiseResponse from '../../src/responses/promise-response';
import CompositeResponse from '../../src/responses/composite-response';

test('can be constructed with default parameters', t => {
  const h = new PromiseResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'promise-response-handler');
  t.truthy(h.user);
  t.pass();
});

test.cb('should execute promise and callback', t => {
  const cb = () => new CompositeResponse(); // just empty response
  const promise = new Promise((resolve) => {
    // let's do some custom asynchronous operation here, this is why this handler was introduced.
    setTimeout(resolve, 1);
  });
  const response = new PromiseResponse({ promise, cb });
  const h = new PromiseResponseHandler({ response, user: { platformType: 'cli' } });
  h.call(() => {
    t.end();
  });
});
