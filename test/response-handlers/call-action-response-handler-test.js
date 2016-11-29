import test from 'ava';
import CallActionResponseHandler from '../../src/response-handlers/call-action-response-handler';
import { mockLoadUser } from '../../src/factories/user-factory';
import CallActionResponse from '../../src/responses/call-action-response';

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
