/* eslint-disable no-new */
import test from 'ava';
import RequestLocationResponse from '../../src/responses/request-location-response';

test('can be constructed with default parameters', t => {
  const response = new RequestLocationResponse();
  t.is(response.type, 'request-location');
  t.pass();
});
