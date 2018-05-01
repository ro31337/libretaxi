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

import test from 'ava';
import CallActionResponseHandler from '../../src/response-handlers/call-action-response-handler';
import { mockLoadUser } from '../../src/factories/user-factory';
import CallActionResponse from '../../src/responses/call-action-response';
import { ss } from '../spec-support';

test('can be constructed with default parameters', t => {
  const h = new CallActionResponseHandler({ response: {} });
  t.is(h.type, 'call-action-response-handler');
});

test.cb('should create message and post to the queue when kicker not specified', t => {
  const queue = {
    create: (obj) => {
      t.is(obj.userKey, 'cli_1');
      t.deepEqual(obj.arg, { foo: 'bar' });
      t.is(obj.route, 'default');
    },
  };

  const response = new CallActionResponse({
    userKey: 'cli_1',
    route: 'default',
    arg: { foo: 'bar' },
  });

  const h = new CallActionResponseHandler({ response, queue });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  mockLoadUser(() => { return { then }; }); // eslint-disable-line arrow-body-style

  h.call(() => { t.end(); });
});

test.cb('should not enqueue when kicker is not satisfied', t => {
  const queue = { create: () => { t.fail('should not enqueue'); } };

  const response = new CallActionResponse({
    userKey: 'cli_1',
    route: 'default',
    arg: { foo: 'bar' },
    kicker: { menuLocation: 'something_different' },
  });

  const h = new CallActionResponseHandler({ response, queue });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  mockLoadUser(() => { return { then }; }); // eslint-disable-line arrow-body-style

  h.call(() => { t.end(); });
});

test.cb('should enqueue with correct kicker', t => {
  const queue = { create: () => { t.end(); } };

  const response = new CallActionResponse({
    userKey: 'cli_1',
    route: 'default',
    arg: { foo: 'bar' },
    kicker: { menuLocation: 'foobar' },
  });

  const h = new CallActionResponseHandler({ response, queue });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  mockLoadUser(() => { return { then }; }); // eslint-disable-line arrow-body-style

  h.call(() => {});
});

test.cb('should enqueue with delay', t => {
  t.plan(6);

  const queue = {
    createDelayed: (obj, delay) => {
      t.is(obj.userKey, 'cli_1');
      t.deepEqual(obj.arg, { foo: 'bar' });
      t.is(obj.route, 'default');
      t.is(delay, 3000);
    },
    create: ss.sinon.spy(),
  };

  const response = new CallActionResponse({
    userKey: 'cli_1',
    route: 'default',
    arg: { foo: 'bar' },
    delay: 3000,
  });

  const h = new CallActionResponseHandler({ response, queue });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  mockLoadUser(() => { return { then }; }); // eslint-disable-line arrow-body-style

  h.call(() => {
    t.is(queue.create.called, false);
    t.end();
  });
});
