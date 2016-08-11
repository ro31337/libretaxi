/* eslint-disable no-new */
import test from 'ava';
import RequestUserInputResponse from '../../src/responses/request-user-input-response';

test('can be constructed with default parameters', t => {
  const response = new RequestUserInputResponse();
  t.is(response.type, 'request-user-input');
  t.pass();
});
