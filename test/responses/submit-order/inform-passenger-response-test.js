/* eslint-disable no-new */
import test from 'ava';
import InformPassengerResponse from '../../../src/responses/submit-order/inform-passenger-response';
import checkNotNullTest from '../../helpers/check-not-null.js';

checkNotNullTest('passengerKey', (args) => { new InformPassengerResponse(args); });

test('response can be constructed with default parameters', t => {
  const r = new InformPassengerResponse({ passengerKey: 'cli_1' });
  t.is(r.type, 'inform-passenger');
  t.is(r.passengerKey, 'cli_1');
});
