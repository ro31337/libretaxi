/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import ActionFactory from '../src/action-factory';

test('should return routes by menu location', t => {
  // update here when you have more routes
  t.truthy(ActionFactory.fromMenuLocation({ state: { menuLocation: 'select-locale' } }));
});

test('should have default route', t => {
  t.truthy(ActionFactory.fromMenuLocation({ state: {} }));
});

test.cb('should fail when route key not found', t => {
  const err = 'Can\'t find route key "foo" in routes';

  t.throws(() => {
    ActionFactory.fromMenuLocation({ state: { menuLocation: 'foo' } });
  }, err);

  t.end();
});

test('should have i18n object which defaults to en', t => {
  const action = ActionFactory.fromMenuLocation({ state: {} });
  t.truthy(action.i18n);
  t.is(action.i18n.locale, 'en');
  t.is(action.i18n.__('__locale__'), 'en');
});

test('should support en locale', t => {
  const action = ActionFactory.fromMenuLocation({ state: { locale: 'en' } });
  t.truthy(action.i18n);
  t.is(action.i18n.locale, 'en');
  t.is(action.i18n.__('__locale__'), 'en');
});

test('should support ru locale', t => {
  const action = ActionFactory.fromMenuLocation({ state: { locale: 'ru' } });
  t.truthy(action.i18n);
  t.is(action.i18n.locale, 'ru');
  t.is(action.i18n.__('__locale__'), 'ru');
});
