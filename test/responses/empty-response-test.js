/* eslint-disable no-new */
import test from 'ava';
import EmptyResponse from '../../src/responses/empty-response';

test('can be constructed with default parameters', t => {
  new EmptyResponse();
  t.pass();
});

test('should have type', t => {
  const r = new EmptyResponse();
  t.is(r.type, 'empty');
});
