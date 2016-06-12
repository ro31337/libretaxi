/* eslint-disable no-new */
import test from 'ava';
import Response from '../../src/responses/response';

test('response can be constructed with default parameters', t => {
  new Response({ type: 'text' });
  t.pass();
});

test.cb('should throw error when parameters not specified', t => {
  const err = 'parameters not specified';
  t.throws(() => { new Response(); }, err);
  t.end();
});

test.cb('should throw error when "type" parameter not specified', t => {
  const err = "'type' parameter not specified";
  t.throws(() => { new Response({ foo: 123 }); }, err);
  t.end();
});
