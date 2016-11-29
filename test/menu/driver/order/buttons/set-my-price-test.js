/* eslint-disable no-new, max-len */
import test from 'ava';
import setMyPrice, { SetMyPrice } from '../../../../../src/actions/menu/driver/order/buttons/set-my-price';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new SetMyPrice(args); });

test('can be constructed with default parameters', t => {
  const r = new SetMyPrice({ userKey: 'cli_1', arg: { foo: 'bar', orderKey: 'd3adb33f' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'save-and-redirect');
  t.deepEqual(r.kicker, { menuLocation: 'driver-index' });
  t.deepEqual(r.arg, { foo: 'bar', orderKey: 'd3adb33f' });
});

test('factory method should return stringified json response', t => {
  const response = setMyPrice({ passengerKey: 'cli_1', distance: 5, orderKey: 'd3adb33f' }, { userKey: 'cli_2' });
  // json example:
  // {"type":"call-action","route":"save-and-redirect","kicker":"driver-index","userKey":"cli_2","arg":{"passengerKey":"cli_1","distance":5,"path":"driver-order-set-price"}}
  t.deepEqual(response, {
    type: 'call-action',
    route: 'save-and-redirect',
    kicker: { menuLocation: 'driver-index' },
    userKey: 'cli_2',
    arg: {
      passengerKey: 'cli_1',
      distance: 5,
      path: 'driver-order-set-price',
      orderKey: 'd3adb33f',
    },
  });
});
