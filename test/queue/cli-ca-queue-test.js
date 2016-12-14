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
  t.plan(2);
  const cb = { cb: true };
  const recreate = { recreate: true };
  const queue = new CliCaQueue({
    userKey: 'cli_1',
    queue: { // inject dependency
      process: (type, callback) => {
        t.is(type, 'call-action');
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
