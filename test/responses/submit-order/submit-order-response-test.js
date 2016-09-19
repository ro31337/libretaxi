/* eslint-disable no-new */
import test from 'ava';
import SubmitOrderResponse from '../../../src/responses/submit-order/submit-order-response';

test('response can be constructed with default parameters', t => {
  const r = new SubmitOrderResponse({
    passengerKey: 'cli_1',
    passengerLocation: [37.421955, -122.084058],
    passengerDestination: 'South San Francisco BART station, CA, 94080',
    createdAt: (new Date).getTime(), // use Firebase Timestamp in your code!
    requestedVehicleType: 'car',
  });
  t.is(r.type, 'composite');
  t.is(r.responses[0].type, 'save-order');
  t.is(r.responses[1].type, 'inform-passenger');
});
