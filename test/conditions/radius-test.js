/* eslint-disable no-new */
import test from 'ava';
import Radius from '../../src/conditions/radius';

const settings = { MAX_RADIUS: 10 };

test('can be constructed with default parameters', t => {
  const n = new Radius('1', settings);
  t.is(n.type, 'radius');
});

test('should be truthy when numeric', t => {
  t.truthy(new Radius(5, settings).call());
  t.truthy(new Radius('1', settings).call());
  t.truthy(new Radius('5', settings).call());
  t.truthy(new Radius(' 5', settings).call());
  t.truthy(new Radius('5 ', settings).call());
  t.truthy(new Radius(' 5 ', settings).call());
  t.truthy(new Radius('  5  ', settings).call());
});

test('should be falsy when not numeric', t => {
  t.falsy(new Radius('asd', settings).call());
  t.falsy(new Radius(undefined, settings).call());
  t.falsy(new Radius(' ', settings).call());
});

test('should be falsy when out of range', t => {
  t.falsy(new Radius('11', settings).call());
  t.falsy(new Radius('0', settings).call());
  t.falsy(new Radius('-1', settings).call());
});

test('should be truthy when in range', t => {
  t.truthy(new Radius('1', settings).call());
  t.truthy(new Radius('2', settings).call());
  t.truthy(new Radius('3', settings).call());
  t.truthy(new Radius('8', settings).call());
  t.truthy(new Radius('9', settings).call());
  t.truthy(new Radius('10', settings).call());
});
