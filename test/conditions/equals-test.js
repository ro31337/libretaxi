/* eslint-disable no-new */
import test from 'ava';
import Equals from '../../src/conditions/equals';

test('can be constructed with default parameters', t => {
  const c1 = new Equals(2 + 2, 4);
  const c2 = new Equals(2 + 2, 5);
  t.is(c1.type, 'equals');
  t.is(c2.type, 'equals');
});

test('should be truthy for truthy condition', t => {
  const c = new Equals(2 + 2, 4);
  t.truthy(c.call());
});

test('should be falsy for falsy condition', t => {
  const c = new Equals(2 + 2, 5);
  t.falsy(c.call());
});
