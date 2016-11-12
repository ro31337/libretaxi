/* eslint-disable no-new */
import test from 'ava';
import In from '../../src/conditions/in';

test('can be constructed with default parameters', t => {
  const c1 = new In(2, [2, 4, 6]);
  t.is(c1.type, 'in');
});

test('should be truthy when element in', t => {
  const c1 = new In(1, [1, 4, 6]);
  const c2 = new In('one', ['one', 'four', 'six']);
  t.truthy(c1.call());
  t.truthy(c2.call());
});

test('should be falsy when element not in', t => {
  const c1 = new In(1, [2, 4, 6]);
  const c2 = new In('one', ['two', 'four', 'six']);
  t.falsy(c1.call());
  t.falsy(c2.call());
});
