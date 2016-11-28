/* eslint-disable no-new */
import test from 'ava';
import initLocale from '../../src/support/init-locale';

test('should return i18n object which defaults to en', t => {
  const l = initLocale({ state: {} });
  t.truthy(l);
  t.is(l.locale, 'en');
  t.is(l.__('__locale__'), 'en');
});

test('should support en locale', t => {
  const l = initLocale({ state: { locale: 'en' } });
  t.truthy(l);
  t.is(l.locale, 'en');
  t.is(l.__('__locale__'), 'en');
});

test('should support ru locale', t => {
  const l = initLocale({ state: { locale: 'ru' } });
  t.truthy(l);
  t.is(l.locale, 'ru');
  t.is(l.__('__locale__'), 'ru');
});
