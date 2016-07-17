/* eslint-disable no-new, no-console */
import test from 'ava';
import Handler from '../../src/response-handlers/not-implemented-response-handler';

test('can be constructed with default parameters without error', t => {
  const h = new Handler({ response: {} });
  t.is(h.type, 'not-implemented-response-handler');
  t.pass();
});

test.cb('throws error on call', t => {
  const h = new Handler({ response: {} });
  t.throws(() => { h.call(); }, 'not implemented');
  t.end();
});
