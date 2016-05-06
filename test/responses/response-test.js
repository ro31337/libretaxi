/* eslint-disable no-new */
import test from 'ava';
import Response from '../../src/responses/response';

test('response can be constructed with default parameters', t => {
  new Response({ type: 'text' });
  t.pass();
});
