/* eslint-disable no-new, max-len */
import test from 'ava';
import sendMyNumber, { SendMyNumber } from '../../../../../src/actions/menu/driver/order/buttons/send-my-number.js';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new SendMyNumber(args); });

test('can be constructed with default parameters', t => {
  const r = new SendMyNumber({ userKey: 'cli_1', orderKey: 'd3adb33f', arg: { foo: 'bar' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'passenger-contact-new-number');
  t.deepEqual(r.kicker, { menuLocation: 'order-submitted', currentOrderKey: 'd3adb33f' });
  t.is(r.arg.foo, 'bar');
});

test('factory method should return stringified json response', t => {
  const response = sendMyNumber({ passengerKey: 'cli_1', distance: 5, orderKey: 'd3adb33f' }, { state: { phone: '12345' } });
  // json example:
  // {"type":"call-action","route":"passenger-contact-new-number","kicker":"order-submitted","userKey":"cli_1","arg":{"driverPhone":"12345","distance":5}}
  t.deepEqual(response, {
    type: 'call-action',
    route: 'passenger-contact-new-number',
    kicker: { menuLocation: 'order-submitted', currentOrderKey: 'd3adb33f' },
    userKey: 'cli_1',
    orderKey: 'd3adb33f',
    arg: {
      driverPhone: '12345',
      distance: 5,
    },
  });
});
