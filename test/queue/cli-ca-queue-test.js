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
import CliCaQueue from '../../src/queue/cli-ca-queue';
import checkNotNullTest from '../helpers/check-not-null.js';
import { ss } from '../spec-support';
import sinon from 'sinon';

checkNotNullTest('userKey', (args) => { new CliCaQueue(args); });

test('should have ca type', t => {
  const queue = new CliCaQueue({ userKey: 'cli_1' });
  t.is(queue.type, 'call-action');
  queue.process();
});

test('should have instance type', t => {
  const queue = new CliCaQueue({ userKey: 'cli_1' });
  t.is(queue.instanceType, 'call-action-cli_1');
});

test.cb('should call super.process(recreate) on process', t => {
  t.plan(3);
  const cb = { cb: true };
  const recreate = { recreate: true };
  const queue = new CliCaQueue({
    userKey: 'cli_1',
    queue: { // inject dependency
      process: (type, num, callback) => {
        t.is(type, 'call-action');
        t.is(num, 20);
        t.is(callback, recreate);
        t.end();
      },
    },
    instanceQueue: {
      process: () => {},
    },
  });
  queue.recreate = recreate;
  queue.process(cb);
});

test.cb('should subscribe to instance queue messages on process', t => {
  t.plan(1);
  const cb = { cb: true };
  const queue = new CliCaQueue({
    userKey: 'cli_1',
    queue: {
      process: () => {},
    },
    instanceQueue: {
      process: (callback) => { // we call "process" - this is how we're subscribed
        t.is(callback, cb);
        t.end();
      },
    },
  });
  queue.recreate = () => {};
  queue.process(cb);
});

test.cb('should recreate message on recreate callback', t => {
  t.plan(3);

  const instanceKue = {};
  const create = ss.sinon.stub().returns(instanceKue);
  const removeOnComplete = ss.sinon.stub().returns(instanceKue);
  const save = ss.sinon.stub().returns(instanceKue);
  Object.assign(instanceKue, { create, removeOnComplete, save });

  const data = { foo: 'bar', userKey: 'cli_2' };
  const job = { data };
  const queue = new CliCaQueue({
    userKey: 'cli_1',
    instanceKue,
  });
  const done = () => {
    t.truthy(create.calledWith('call-action-cli_2', { foo: 'bar', userKey: 'cli_2' }));
    t.truthy(removeOnComplete.calledWith(true));
    t.truthy(save.calledWith());
    sinon.assert.callOrder(create, removeOnComplete, save);
    t.end();
  };
  queue.recreate(job, done);
});
