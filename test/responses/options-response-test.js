/* eslint-disable no-new */
import test from 'ava';
import OptionsResponse from '../../src/responses/options-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('rows', (args) => { new OptionsResponse(args); });

test('can be constructed with default parameters', t => {
  new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.pass();
});

test('instance should have properties', t => {
  const r = new OptionsResponse({
    rows: [[{ label: 'Ok', value: 'ok' }]],
    message: 'foo',
    defaultMessage: 'bar',
  });
  t.truthy(r.rows);
  t.is(r.message, 'foo');
  t.is(r.defaultMessage, 'bar');
  t.pass();
});
