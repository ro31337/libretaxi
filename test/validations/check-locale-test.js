/* eslint-disable no-new */
import test from 'ava';
import checkLocale from '../../src/validations/check-locale';
import { mix } from 'mixwith';

class Foo extends mix(class {}).with(checkLocale) {}

test.cb('should throw error when \'locale\' parameter not supported', t => {
  const err = 'locale \'bar\' not supported';
  t.throws(() => { new Foo({ locale: 'bar' }); }, err);
  t.end();
});

test.cb('should not support empty or unspecified locale', t => {
  const err = '\'locale\' parameter not specified';
  t.throws(() => { new Foo({ locale: '' }); }, err);
  t.throws(() => { new Foo(); }, err);
  t.throws(() => { new Foo({}); }, err);
  t.end();
});

test('should support already existing locales', t => {
  new Foo({ locale: 'en' });
  new Foo({ locale: 'ru' });
  t.pass();
});
