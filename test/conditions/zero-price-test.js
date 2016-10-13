/* eslint-disable no-new */
import test from 'ava';
import ZeroPrice from '../../src/conditions/zero-price';

test('can be constructed with default parameters', t => {
  const n = new ZeroPrice('0');
  t.is(n.type, 'zero-price');
});

test('should be truthy when price is zero', t => {
  t.truthy(new ZeroPrice('0').call());
  t.truthy(new ZeroPrice(' 0 ').call());
  t.truthy(new ZeroPrice('0 ').call());
  t.truthy(new ZeroPrice(' 0').call());
  t.truthy(new ZeroPrice(0).call());
  t.truthy(new ZeroPrice(' 0000 ').call());
});

test('should be falsy when price is not zero', t => {
  t.falsy(new ZeroPrice('1').call());
  t.falsy(new ZeroPrice('01').call());
  t.falsy(new ZeroPrice('10').call());
  t.falsy(new ZeroPrice('100000').call());
  t.falsy(new ZeroPrice('000001').call());
  t.falsy(new ZeroPrice(' 100 ').call());
});
