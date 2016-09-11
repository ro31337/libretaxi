/* eslint-disable no-new */
import test from 'ava';
import NotIn from '../../src/conditions/not-in';

test('can be constructed with default parameters', t => {
  const c1 = new NotIn(2, [2, 4, 6]);
  t.is(c1.type, 'not-in');
});

test('should be truthy when element not in', t => {
  const c1 = new NotIn(1, [2, 4, 6]);
  const c2 = new NotIn('one', ['two', 'four', 'six']);
  t.truthy(c1.call());
  t.truthy(c2.call());
});

test('should be falsy when element in', t => {
  const c1 = new NotIn(4, [2, 4, 6]);
  const c2 = new NotIn('four', ['two', 'four', 'six']);
  t.falsy(c1.call());
  t.falsy(c2.call());
});
