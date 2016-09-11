/* eslint-disable no-new */
import test from 'ava';
import Condition from '../../src/conditions/condition';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('type', (args) => { new Condition(args); });

test('can be constructed with default parameters', t => {
  // however, it's abstract class
  const c = new Condition({ type: 'foo' });
  t.is(c.type, 'foo');
});

test.cb('should throw error when for missing methods', t => {
  const err = 'not implemented';
  const c = new Condition({ type: 'foo' });
  t.throws(() => { c.call(); }, err);
  t.end();
});
