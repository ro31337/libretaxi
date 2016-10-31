import test from 'ava';
import CallActionResponseHandler from '../../src/response-handlers/call-action-response-handler';
import { mockLoadUser } from '../../src/factories/user-factory';
import CallActionResponse from '../../src/responses/call-action-response';

test('can be constructed with default parameters', t => {
  const h = new CallActionResponseHandler({ response: {} });
  t.is(h.type, 'call-action-response-handler');
});

test.cb('should create message and post to the queue', t => {
  const queue = {
    create: (obj) => {
      t.is(obj.userKey, 'cli_1');
      t.deepEqual(obj.arg, { foo: 'bar' });
      t.is(obj.route, 'test-route');
    },
  };

  const response = new CallActionResponse({
    userKey: 'cli_1',
    route: 'default',
    arg: { foo: 'bar' },
    queue,
  });

  const h = new CallActionResponseHandler({ response });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  mockLoadUser(() => { return { then }; }); // eslint-disable-line arrow-body-style

  h.call(() => { t.end(); });
});
