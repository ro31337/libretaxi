import test from 'ava';
import EmptyResponseHandler from '../../src/response-handlers/empty-response-handler';
import { ss } from '../spec-support';

test('can be constructed with default parameters', t => {
  const h = new EmptyResponseHandler({ response: {} });
  t.is(h.type, 'empty-response-handler');
  t.pass();
});

test('can be called without callback function', t => {
  const h = new EmptyResponseHandler({ response: {} });
  h.call();
  t.pass();
});

test('should not execute callback even if it\'s provided', t => {
  const h = new EmptyResponseHandler({ response: {} });
  const onResult = ss.sinon.spy();
  h.call(onResult);
  t.is(onResult.called, false);
  t.pass();
});
