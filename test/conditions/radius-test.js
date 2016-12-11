/* eslint-disable no-new */
import test from 'ava';
import Radius from '../../src/conditions/radius';

test('can be constructed with default parameters', t => {
  const n = new Radius('1');
  t.is(n.type, 'radius');
});

test('should be truthy when numeric', t => {
  t.truthy(new Radius(5).call());
  t.truthy(new Radius('1').call());
  t.truthy(new Radius('5').call());
  t.truthy(new Radius(' 5').call());
  t.truthy(new Radius('5 ').call());
  t.truthy(new Radius(' 5 ').call());
  t.truthy(new Radius('  5  ').call());
});

test('should be falsy when not numeric', t => {
  t.falsy(new Radius('asd').call());
  t.falsy(new Radius().call());
  t.falsy(new Radius(' ').call());
});

test('should be falsy when out of range', t => {
  t.falsy(new Radius('11').call());
  t.falsy(new Radius('0').call());
  t.falsy(new Radius('-1').call());
});

test('should be truthy when in range', t => {
  t.truthy(new Radius('1').call());
  t.truthy(new Radius('2').call());
  t.truthy(new Radius('3').call());
  t.truthy(new Radius('8').call());
  t.truthy(new Radius('9').call());
  t.truthy(new Radius('10').call());
});
