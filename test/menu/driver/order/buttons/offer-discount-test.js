/* eslint-disable no-new, max-len */
import test from 'ava';
import offerDiscount, { OfferDiscount } from '../../../../../src/actions/menu/driver/order/buttons/offer-discount';
import checkNotNullTest from '../../../../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'arg'], (args) => { new OfferDiscount(args); });

test('can be constructed with default parameters', t => {
  const r = new OfferDiscount({ userKey: 'cli_1', arg: { foo: 'bar' } });
  t.is(r.type, 'call-action');
  t.is(r.route, 'save-and-redirect');
  t.is(r.kicker, 'driver-index');
  t.is(r.arg.foo, 'bar');
});

test('factory method should return stringified json response', t => {
  const json = offerDiscount({ passengerKey: 'cli_1', distance: 5 }, { userKey: 'cli_2' });
  t.deepEqual(JSON.parse(json), {
    type: 'call-action',
    route: 'save-and-redirect',
    kicker: 'driver-index',
    userKey: 'cli_2',
    arg: {
      passengerKey: 'cli_1',
      distance: 5,
      path: 'driver-order-offer-discount',
    },
  });
});
