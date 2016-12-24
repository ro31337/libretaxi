/* eslint-disable no-new */
import test from 'ava';
import Location from '../../src/conditions/location';

test('can be constructed with default parameters', t => {
  const c = new Location([1, 2]);
  t.is(c.type, 'location');
});

test('should return true for valid locations', t => {
  t.is(new Location([1, 2]).call(), true);
  t.is(new Location([10.01, 20.02]).call(), true);
  t.is(new Location([-10.01, -20.02]).call(), true);
  t.is(new Location([37.421955, -122.084058]).call(), true);
});

test('should return false for invalid locations', t => {
  t.is(new Location('string').call(), false);
  t.is(new Location('').call(), false);
  t.is(new Location(undefined).call(), false);
  t.is(new Location([]).call(), false);
  t.is(new Location([1]).call(), false);
  t.is(new Location([1, 2, 3]).call(), false);
  t.is(new Location([-1000, 1000]).call(), false);
  t.is(new Location([-91, 10]).call(), false);
  t.is(new Location([91, 10]).call(), false);
  t.is(new Location([10, 181]).call(), false);
  t.is(new Location([10, -181]).call(), false);
});
