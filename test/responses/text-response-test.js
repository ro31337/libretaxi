/* eslint-disable no-new */
import test from 'ava';
import TextResponse from '../../src/responses/text-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('message', (args) => { new TextResponse(args); });

test('can be constructed with default parameters', t => {
  const r = new TextResponse({ message: 'my message' });
  t.falsy(r.important);
  t.pass();
});

test('should save props and have text type', t => {
  const r = new TextResponse({ message: 'my message', important: true });
  t.is(r.message, 'my message');
  t.is(r.important, true);
  t.is(r.type, 'text');
});
