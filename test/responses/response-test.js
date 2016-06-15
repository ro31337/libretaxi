/* eslint-disable no-new */
import test from 'ava';
import Response from '../../src/responses/response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('type', (args) => { new Response(args); });

test('response can be constructed with default parameters', t => {
  new Response({ type: 'text' });
  t.pass();
});
