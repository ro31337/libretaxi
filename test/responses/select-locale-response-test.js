/* eslint-disable no-new */
import test from 'ava';
import SelectLocaleResponse from '../../src/responses/select-locale-response';

test('can be constructed with default parameters', t => {
  new SelectLocaleResponse({ locale: 'en' });
  t.pass();
});

test('should save properties and have \'user-state\' type', t => {
  const r = new SelectLocaleResponse({ locale: 'en' });
  t.is(r.locale, 'en');
  t.is(r.type, 'user-state');
});
