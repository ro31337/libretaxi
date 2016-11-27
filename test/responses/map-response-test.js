/* eslint-disable no-new */
import test from 'ava';
import MapResponse from '../../src/responses/map-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('location', (args) => { new MapResponse(args); });

const location = [37.421955, -122.084058];

test('can be constructed with default parameters', t => {
  new MapResponse({ location });
  t.pass();
});

test('should have properties', t => {
  const r = new MapResponse({ location, message: 'foo' });
  t.is(r.type, 'map');
  t.is(r.message, 'foo');
});

test('should save location property', t => {
  const r = new MapResponse({ location });
  t.is(r.location[0], 37.421955);
  t.is(r.location[1], -122.084058);
});
