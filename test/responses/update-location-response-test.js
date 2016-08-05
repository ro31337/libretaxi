/* eslint-disable no-new */
import test from 'ava';
import UpdateLocationResponse from '../../src/responses/update-location-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('location', (args) => { new UpdateLocationResponse(args); });

const location = [37.421955, -122.084058];

test('can be constructed with default parameters', t => {
  new UpdateLocationResponse({ location });
  t.pass();
});

test('should have type', t => {
  const r = new UpdateLocationResponse({ location });
  t.is(r.type, 'update-location');
});

test('should save location property', t => {
  const r = new UpdateLocationResponse({ location });
  t.is(r.location[0], 37.421955);
  t.is(r.location[1], -122.084058);
});
