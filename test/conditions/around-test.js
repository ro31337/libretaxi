/* eslint-disable no-new */
import test from 'ava';
import Around from '../../src/conditions/around';

test('can be constructed with default parameters', t => {
  const c = new Around([1, 2], [1, 2], 10);
  t.is(c.type, 'around');
});

test('should pass smoke test', t => {
  // South San Francisco BART around 5 km of Golden Gate Bridge? (false)
  t.is(new Around([37.664059, -122.443742], [37.818293, -122.478375], 5).call(), false);
  // South San Francisco BART around 100 km of Golden Gate Bridge? (true)
  t.is(new Around([37.664059, -122.443742], [37.818293, -122.478375], 100).call(), true);
});
