/* eslint-disable no-new */
import test from 'ava';
import TextResponse from '../../src/responses/text-response';

test('can be constructed with default parameters', t => {
  new TextResponse({ message: 'my message' });
  t.pass();
});

test.cb('should throw argument error when message not specified', t => {
  const err = "'message' parameter not specified";

  t.throws(() => {
    new TextResponse();
  }, err);

  t.end();
});

test('should save message as property and have text type', t => {
  const r = new TextResponse({ message: 'my message' });
  t.is(r.message, 'my message');
  t.is(r.type, 'text');
});
