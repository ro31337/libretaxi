/* eslint-disable no-new */
import test from 'ava';
import InformPassengerResponseHandler from '../../../src/response-handlers/submit-order/inform-passenger-response-handler'; // eslint-disable-line max-len
import InformPassengerResponse from '../../../src/responses/submit-order/inform-passenger-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new InformPassengerResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new InformPassengerResponseHandler({ response: {} });
  t.pass();
});

test.cb('should post message to the queue when informing passenger', t => {
  // arrange
  t.plan(1);
  const response = new InformPassengerResponse({ passengerKey: 'cli_1' });
  const spy = ss.sinon.spy();
  const handler = new InformPassengerResponseHandler({ response });
  handler.queue = { redirect: spy };

  // act
  handler.call(() => {
    // assert
    t.truthy(spy.calledWith({ userKey: 'cli_1', route: 'order-submitted' }));
    t.end();
  });
});
