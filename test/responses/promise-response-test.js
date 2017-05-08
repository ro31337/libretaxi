/* eslint-disable no-new */
import test from 'ava';
import PromiseResponse from '../../src/responses/promise-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['promise', 'cb'], (args) => { new PromiseResponse(args); });

test('can be constructed with default parameters', t => {
  new PromiseResponse({ promise: {}, cb: {} });
  t.pass();
});

test('instance should have all props defined', t => {
  const promise = {};
  const cb = {};
  const r = new PromiseResponse({ promise, cb });
  t.is(r.promise, promise);
  t.is(r.cb, cb);
  t.falsy(r.missingProp);
});
