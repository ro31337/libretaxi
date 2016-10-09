/* eslint-disable no-new */
import test from 'ava';
import Numeric from '../../src/conditions/numeric';

test('can be constructed with default parameters', t => {
  const n = new Numeric(123);
  t.is(n.type, 'numeric');
});

test('should be truthy when numeric', t => {
  t.truthy(new Numeric(123).call());
  t.truthy(new Numeric('0').call());
  t.truthy(new Numeric('123').call());
  t.truthy(new Numeric(' 123').call());
  t.truthy(new Numeric('123 ').call());
  t.truthy(new Numeric(' 123 ').call());
  t.truthy(new Numeric('  123  ').call());
});

test('should be falsy when not numeric', t => {
  t.falsy(new Numeric('asd').call());
  t.falsy(new Numeric().call());
  t.falsy(new Numeric(' ').call());
});
