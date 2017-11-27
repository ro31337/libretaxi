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
// failing test(s)? possible reason - we override queue, but these tests can run in parallel.
import test from 'ava';
import Queue from '../../src/queue/queue';
import { ss } from '../spec-support';
import sinon from 'sinon';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('type', (args) => { new Queue(args); });

test('should create message on create', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const removeOnComplete = ss.sinon.stub().returns(myQueue);
  const ttl = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, removeOnComplete, ttl, save });
  const queue = new Queue({ type: 'test-queue-type1', queue: myQueue });

  // act
  queue.create({ foo1: 'bar1' });

  // assert
  t.truthy(create.calledWith('test-queue-type1', { foo1: 'bar1' }));
  t.truthy(removeOnComplete.calledWith(true));
  t.truthy(ttl.calledWith(5000));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, removeOnComplete, save);
});

test('should create delayed message on createDelayed', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const delay = ss.sinon.stub().returns(myQueue);
  const removeOnComplete = ss.sinon.stub().returns(myQueue);
  const ttl = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, delay, removeOnComplete, ttl, save });
  const queue = new Queue({ type: 'test-queue-type2', queue: myQueue });

  // act
  queue.createDelayed({ foo2: 'bar2' });

  // assert
  t.truthy(create.calledWith('test-queue-type2', { foo2: 'bar2' }));
  t.truthy(delay.calledWith(1000));
  t.truthy(removeOnComplete.calledWith(true));
  t.truthy(ttl.calledWith(5000));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, delay, removeOnComplete, save);
});

test('should process \'call-action\' messages', t => {
  // arrange
  const myQueue = { process: ss.sinon.stub() };
  const queue = new Queue({ type: 'test-queue-type3', queue: myQueue });

  // act
  queue.process({ foo3: 'bar3' });

  // assert
  t.truthy(myQueue.process.calledWith('test-queue-type3', 200, { foo3: 'bar3' }));
});

test('should create delayed message with custom delay on createDelayed', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const delay = ss.sinon.stub().returns(myQueue);
  const removeOnComplete = ss.sinon.stub().returns(myQueue);
  const ttl = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, delay, removeOnComplete, ttl, save });
  const queue = new Queue({ type: 'test-queue-type2', queue: myQueue });

  // act
  queue.createDelayed({ foo2: 'bar2' }, 31337);

  // assert
  t.truthy(create.calledWith('test-queue-type2', { foo2: 'bar2' }));
  t.truthy(delay.calledWith(31337));
  t.truthy(removeOnComplete.calledWith(true));
  t.truthy(ttl.calledWith(5000));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, delay, removeOnComplete, save);
});
