/* eslint-disable no-new */
import test from 'ava';
import CliCaQueue from '../../src/queue/cli-ca-queue';
import checkNotNullTest from '../helpers/check-not-null.js';

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

test.cb('should recreate message in instance queue on recreate callback', t => {
  t.plan(1);
  const data = { a: 1, b: 2, c: 3 };
  const job = { data };
  const queue = new CliCaQueue({
    userKey: 'cli_1',
    instanceQueue: {
      create: (obj) => {
        t.deepEqual(obj, data);
      },
    },
  });
  const done = () => {
    t.end();
  };
  queue.recreate(job, done);
});
