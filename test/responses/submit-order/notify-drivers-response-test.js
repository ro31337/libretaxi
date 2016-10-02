/* eslint-disable no-new */
import test from 'ava';
import NotifyDriversResponse from '../../../src/responses/submit-order/notify-drivers-response';
import checkNotNullTest from '../../helpers/check-not-null.js';

checkNotNullTest('passengerKey', (args) => { new NotifyDriversResponse(args); });

test('can be constructed with default parameters', t => {
  const r = new NotifyDriversResponse({ passengerKey: 'cli_1' });
  t.is(r.type, 'notify-drivers');
  t.pass();
});
