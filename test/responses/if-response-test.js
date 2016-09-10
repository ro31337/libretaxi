/* eslint-disable no-new */
import test from 'ava';
import IfResponse from '../../src/responses/if-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['condition', 'ok'], (args) => { new IfResponse(args); });

test('can be constructed with default parameters', t => {
  new IfResponse({ condition: {}, ok: {} });
  new IfResponse({ condition: {}, ok: {}, err: {} });
  t.pass();
});

test('instance should have all props defined', t => {
  const condition = {};
  const ok = {};
  const r = new IfResponse({ condition, ok });
  t.is(r.condition, condition);
  t.is(r.ok, ok);
  t.falsy(r.err);
});

test('instance should have all props defined when optional parameter present', t => {
  const condition = {};
  const ok = {};
  const err = {};
  const r = new IfResponse({ condition, ok, err });
  t.is(r.condition, condition);
  t.is(r.ok, ok);
  t.is(r.err, err);
});
