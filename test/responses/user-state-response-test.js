/* eslint-disable no-new */
import test from 'ava';
import UserStateResponse from '../../src/responses/user-state-response';

test('can be constructed with default parameters', t => {
  new UserStateResponse({ foo: 1 });
  t.pass();
});

test('should save properties and have \'user-state\' type', t => {
  const r = new UserStateResponse({ foo: 1, bar: 2 });
  t.is(r.foo, 1);
  t.is(r.bar, 2);
  t.is(r.type, 'user-state');
});
