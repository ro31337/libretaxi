/* eslint-disable no-new */
import test from 'ava';
import TextResponse from '../../src/responses/text-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('message', (args) => { new TextResponse(args); });

test('can be constructed with default parameters', t => {
  new TextResponse({ message: 'my message' });
  t.pass();
});

test('should save message as property and have text type', t => {
  const r = new TextResponse({ message: 'my message' });
  t.is(r.message, 'my message');
  t.is(r.type, 'text');
});
