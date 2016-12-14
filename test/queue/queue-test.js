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
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, removeOnComplete, save });
  const queue = new Queue({ type: 'test-queue-type1', queue: myQueue });

  // act
  queue.create({ foo1: 'bar1' });

  // assert
  t.truthy(create.calledWith('test-queue-type1', { foo1: 'bar1' }));
  t.truthy(removeOnComplete.calledWith(true));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, removeOnComplete, save);
});

test('should create delayed message on createDelayed', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const delay = ss.sinon.stub().returns(myQueue);
  const removeOnComplete = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, delay, removeOnComplete, save });
  const queue = new Queue({ type: 'test-queue-type2', queue: myQueue });

  // act
  queue.createDelayed({ foo2: 'bar2' });

  // assert
  t.truthy(create.calledWith('test-queue-type2', { foo2: 'bar2' }));
  t.truthy(delay.calledWith(1000));
  t.truthy(removeOnComplete.calledWith(true));
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
  t.truthy(myQueue.process.calledWith('test-queue-type3', { foo3: 'bar3' }));
});
