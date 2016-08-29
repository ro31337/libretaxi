/* eslint-disable no-new */
// failing test(s)? possible reason - we override queue, but these tests can run in parallel.
import test from 'ava';
import queue from '../src/queue-facade';
import { ss } from './spec-support';
import sinon from 'sinon';

test('should create message on callAction', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const priority = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, priority, save });
  queue.setQueue(myQueue);

  // act
  queue.callAction({ foo1: 'bar1' });

  // assert
  t.truthy(create.calledWith('call-action', { foo1: 'bar1' }));
  t.truthy(priority.calledWith('high'));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, priority, save);
});

test('should create message on callActionWithDelay', t => {
  // arrange
  const myQueue = {};
  const create = ss.sinon.stub().returns(myQueue);
  const delay = ss.sinon.stub().returns(myQueue);
  const priority = ss.sinon.stub().returns(myQueue);
  const save = ss.sinon.stub().returns(myQueue);
  Object.assign(myQueue, { create, delay, priority, save });
  queue.setQueue(myQueue);

  // act
  queue.callActionWithDelay({ foo2: 'bar2' });

  // assert
  t.truthy(create.calledWith('call-action', { foo2: 'bar2' }));
  t.truthy(delay.calledWith(1000));
  t.truthy(priority.calledWith('high'));
  t.truthy(save.calledWith());
  sinon.assert.callOrder(create, delay, priority, save);
});

test('should process \'call-action\' messages', t => {
  // arrange
  const myQueue = { process: ss.sinon.stub() };
  queue.setQueue(myQueue);

  // act
  queue.processCallAction({ foo3: 'bar3' });

  // assert
  t.truthy(myQueue.process.calledWith('call-action', { foo3: 'bar3' }));
});

test('should call callActionWithDelay on redirectToAction', t => {
  // arrange
  const spy = ss.sinon.spy();
  queue.callActionWithDelay = spy;

  // act
  queue.redirectToAction({ userKey: 'cli_1', route: 'test-action' });

  // assert
  t.truthy(spy.calledWith({ userKey: 'cli_1', arg: 'test-action', route: 'redirect' }));
});
