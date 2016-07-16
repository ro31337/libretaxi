/* eslint-disable no-new */
import test from 'ava';
import ResponseHandler from '../../src/response-handlers/response-handler';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('response', (args) => { new ResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new ResponseHandler({ response: {}, type: 'bar' });
  t.pass();
});

test('saves response', t => {
  const r = { message: 'foo' };
  const h = new ResponseHandler({ response: r, type: 'bar' });
  t.is(h.response.message, 'foo');
});

test.cb('abstract class, should throw error on call', t => {
  const err = 'not implemented';
  const h = new ResponseHandler({ response: {}, type: 'bar' });

  t.throws(() => { h.call(); }, err);

  t.end();
});
