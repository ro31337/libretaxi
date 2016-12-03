/* eslint-disable no-new */
import test from 'ava';
import CheckinResponse from '../../src/responses/checkin-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('driverKey', (args) => { new CheckinResponse(args); });

test('can be constructed with default parameters', t => {
  new CheckinResponse({ driverKey: 'cli_1' });
  t.pass();
});

test('instance should have all props defined', t => {
  const r = new CheckinResponse({ driverKey: 'cli_1' });
  t.is(r.type, 'checkin');
  t.is(r.driverKey, 'cli_1');
});
