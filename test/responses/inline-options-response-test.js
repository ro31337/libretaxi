/* eslint-disable no-new */
import test from 'ava';
import InlineOptionsResponse from '../../src/responses/inline-options-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('rows', (args) => { new InlineOptionsResponse(args); });

test('can be constructed with default parameters', t => {
  const r = new InlineOptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.is(r.type, 'inline-options');
});

test('instance should have properties', t => {
  const r = new InlineOptionsResponse({
    rows: [[{ label: 'Ok', value: 'ok' }]],
    message: 'foo',
    defaultMessage: 'bar',
  });
  t.truthy(r.rows);
  t.is(r.message, 'foo');
  t.is(r.defaultMessage, 'bar');
  t.pass();
});
