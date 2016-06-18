/* eslint-disable no-new */
import test from 'ava';
import OptionsResponse from '../../src/responses/options-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('rows', (args) => { new OptionsResponse(args); });

test('can be constructed with default parameters', t => {
  new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.pass();
});

test('instance should have rows as a property', t => {
  const r = new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.truthy(r.rows);
  t.pass();
});
