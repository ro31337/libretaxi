/* eslint-disable no-new, no-console */
import test from 'ava';
import MapResponseHandler from '../../../src/response-handlers/telegram/map-response-handler'; // eslint-disable-line max-len
import MapResponse from '../../../src/responses/map-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new MapResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new MapResponseHandler({ response: {} });
  t.pass();
});

test.cb('should call sendLocation', t => {
  t.plan(1);
  const user = { platformId: 31337 };
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  const h = new MapResponseHandler({ response, user });
  h.api = { sendLocation: ss.sinon.spy() };
  h.call(() => { // should call onResult
    t.truthy(h.api.sendLocation.calledWith(
      31337,
      37.421955,
      -122.084058,
      { disable_notification: true },
    ));
    t.end();
  });
});
