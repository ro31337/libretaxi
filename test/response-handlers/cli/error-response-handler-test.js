/* eslint-disable no-new, no-console */
import test from 'ava';
import ErrorResponseHandler from '../../../src/response-handlers/cli/error-response-handler';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new ErrorResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new ErrorResponseHandler({ response: {} });
  t.pass();
});

test.cb('prints the message with crossmark to console', t => {
  // arrange
  const r = { message: 'foo' };
  const h = new ErrorResponseHandler({ response: r });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  // act
  h.call(() => {
    // assert
    t.truthy(console.log.calledWith('❌ foo'));
    console.log = tmp;
    t.end();
  });
});
