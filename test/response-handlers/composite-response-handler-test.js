/* eslint-disable no-new, no-console */
import test from 'ava';
import CompositeResponseHandler from '../../src/response-handlers/composite-response-handler';
import CompositeResponse from '../../src/responses/composite-response';
import TextResponse from '../../src/responses/text-response';

test('can be constructed with default parameters', t => {
  const h = new CompositeResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'composite-response-handler');
  t.pass();
});

test('can be constructed with default parameters and api', t => {
  const h = new CompositeResponseHandler({ response: {}, user: {}, api: { foo: 'bar' } });
  t.is(h.type, 'composite-response-handler');
  t.deepEqual(h.api, { foo: 'bar' });
});

test.cb('executes all response handlers', t => {
  let result = '';
  const user = { platformType: 'cli' };
  const r1 = new TextResponse({ message: 'one' });
  const r2 = new TextResponse({ message: 'two' });
  const r3 = new TextResponse({ message: 'three' });
  const tmp = console.log;
  console.log = (arg) => {
    result += arg;
  };

  const response = new CompositeResponse()
    .add(r1)
    .add(r2)
    .add(r3);

  const h = new CompositeResponseHandler({ response, user });
  h.call(() => {
    t.is(result, 'onetwothree');
    console.log = tmp;
    t.end();
  });
});
