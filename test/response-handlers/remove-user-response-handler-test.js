/* eslint-disable no-new, no-console, arrow-body-style */
import test from 'ava';
import RemoveUserResponseHandler from '../../src/response-handlers/remove-user-response-handler';

test('can be constructed with default parameters', t => {
  const h = new RemoveUserResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'remove-user-response-handler');
  t.truthy(h.user);
  t.pass();
});

test.cb('should pass if user not specified', t => {
  const h = new RemoveUserResponseHandler({ response: {} });
  h.call(t.end);
});

test.cb('should call firebase api', t => {
  t.plan(2);
  const mock = {
    config: () => { return mock; },
    ref: (arg) => { t.is(arg, 'users'); return mock; },
    child: (arg) => { t.is(arg, 'test_31337'); return mock; },
    remove: (arg) => { arg(); },
  };
  const h = new RemoveUserResponseHandler({
    response: {},
    user: { userKey: 'test_31337' },
    firebaseDB: mock,
  });
  h.call(t.end);
});
