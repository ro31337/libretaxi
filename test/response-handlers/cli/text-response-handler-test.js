/* eslint-disable no-new, no-console */
import test from 'ava';
import TextResponseHandler from '../../../src/response-handlers/cli/text-response-handler';
import checkNotNullTest from '../../helpers/check-not-null.js';
import ss from '../../spec-support';

checkNotNullTest('response', (args) => { new TextResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new TextResponseHandler({ response: {} });
  t.pass();
});

test.cb('prints the message to console', t => {
  // arrange
  const r = { message: 'foo' };
  const h = new TextResponseHandler({ response: r });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  // act
  h.call(() => {
    // assert
    t.truthy(console.log.calledWith('foo'));
    console.log = tmp;
    t.end();
  });
});
