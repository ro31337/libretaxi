/* eslint-disable no-new */
import test from 'ava';
import PropsEqual from '../../src/conditions/props-equal';

test('can be constructed with default parameters', t => {
  new PropsEqual({}, {});
  t.pass();
});

test('should be truthy when fragment is present', t => {
  const c = new PropsEqual({ foo: 'bar' }, { baz: 'qux', foo: 'bar' });
  t.is(c.call(), true);
});

test('should be falsy when fragment is not present', t => {
  const c = new PropsEqual({ foo1: 'bar1' }, { baz: 'qux', foo: 'bar' });
  t.is(c.call(), false);
});

test('should support multiple props', t => {
  const c = new PropsEqual({ a: 1, b: 2 }, { c: 3, b: 2, a: 1 });
  t.is(c.call(), true);
});
