/* eslint-disable no-new, max-len */
import test from 'ava';
import sendMyNumber, { SendMyNumber } from '../../../../../src/actions/menu/driver/order/buttons/send-my-number.js';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new SendMyNumber(args); });

test('can be constructed with default parameters', t => {
  const r = new SendMyNumber({ userKey: 'cli_1', arg: { foo: 'bar' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'passenger-contact-new-number');
  t.is(r.kicker, 'order-submitted');
  t.is(r.arg.foo, 'bar');
});

test('factory method should return stringified json response', t => {
  const json = sendMyNumber({ passengerKey: 'cli_1', distance: 5 }, { state: { phone: '12345' } });
  // json example:
  // {"type":"call-action","route":"passenger-contact-new-number","kicker":"order-submitted","userKey":"cli_1","arg":{"driverPhone":"12345","distance":5}}
  t.deepEqual(JSON.parse(json), {
    type: 'call-action',
    route: 'passenger-contact-new-number',
    kicker: 'order-submitted',
    userKey: 'cli_1',
    arg: {
      driverPhone: '12345',
      distance: 5,
    },
  });
});
