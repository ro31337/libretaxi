/* eslint-disable no-new */
import test from 'ava';
import RemoveUserResponse from '../../src/responses/remove-user-response';

test('can be constructed with default parameters', t => {
  const response = new RemoveUserResponse();
  t.is(response.type, 'remove-user');
  t.pass();
});
