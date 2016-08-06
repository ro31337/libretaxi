/* eslint-disable no-new */
import test from 'ava';
import UpdateLocationResponse from '../../src/responses/update-location-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'location'], (args) => { new UpdateLocationResponse(args); });

const location = [37.421955, -122.084058];
const userKey = 'cli_1';

test('can be constructed with default parameters', t => {
  new UpdateLocationResponse({ userKey, location });
  t.pass();
});

test('should have type', t => {
  const r = new UpdateLocationResponse({ userKey, location });
  t.is(r.type, 'update-location');
});

test('should save properties', t => {
  const r = new UpdateLocationResponse({ userKey, location });
  t.is(r.userKey, 'cli_1');
  t.is(r.location[0], 37.421955);
  t.is(r.location[1], -122.084058);
});
