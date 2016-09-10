/* eslint-disable no-new */
import test from 'ava';
import Condition from '../../src/conditions/condition';

test('can be constructed with default parameters', t => {
  // however, it's abstract class
  new Condition();
  t.pass();
});

test.cb('should throw error when for missing methods', t => {
  const err = 'not implemented';
  const c = new Condition();
  t.throws(() => { c.call(); }, err);
  t.end();
});
