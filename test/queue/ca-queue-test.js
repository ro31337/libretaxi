import test from 'ava';
import CaQueue from '../../src/queue/ca-queue';

test('should have type', t => {
  const queue = new CaQueue();
  t.is(queue.type, 'call-action');
});

test.cb('should call createDelayed on redirect', t => {
  t.plan(3);
  const queue = new CaQueue();
  queue.createDelayed = (options) => {
    t.is(options.userKey, 'cli_1');
    t.is(options.arg, 'index');
    t.is(options.route, 'redirect');
    t.end();
  };
  queue.redirect({ userKey: 'cli_1', route: 'index' });
});
