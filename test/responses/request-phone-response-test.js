/* eslint-disable no-new */
import test from 'ava';
import RequestPhoneResponse from '../../src/responses/request-phone-response';

test('can be constructed with default parameters', t => {
  const response = new RequestPhoneResponse();
  t.is(response.type, 'request-phone');
  t.pass();
});
