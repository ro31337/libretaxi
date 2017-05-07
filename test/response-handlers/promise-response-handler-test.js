/* eslint-disable no-new, no-console */
import test from 'ava';
import PromiseResponseHandler from '../../src/response-handlers/promise-response-handler';
import PromiseResponse from '../../src/responses/promise-response';
import CompositeResponse from '../../src/responses/composite-response';

test('can be constructed with default parameters', t => {
  const h = new PromiseResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'promise-response-handler');
  t.truthy(h.user);
  t.pass();
});

test.cb('should execute promise and callback', t => {
  const cb = () => new CompositeResponse(); // just empty response
  const promise = new Promise((resolve) => {
    // let's do some custom asynchronous operation here, this is why this handler was introduced.
    setTimeout(resolve, 1);
  });
  const response = new PromiseResponse({ promise, cb });
  const h = new PromiseResponseHandler({ response, user: { platformType: 'cli' } });
  h.call(() => {
    t.end();
  });
});
