/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import ActionFactory from '../src/factories/action-factory';

// update _two_ next test cases when you have more routes in `routes.js`

test('should return routes by menu location', t => {
  const a1 = ActionFactory.fromMenuLocation({ state: { menuLocation: 'select-locale' } });
  const a2 = ActionFactory.fromMenuLocation({ state: { menuLocation: 'foo' } });
  t.is(a1.type, 'select-locale');
  t.is(a2.type, 'foo');
});

test('should return routes by route', t => {
  const user = { state: {} };
  const a1 = ActionFactory.fromRoute({ route: 'select-locale', user });
  const a2 = ActionFactory.fromRoute({ route: 'foo', user });
  t.is(a1.type, 'select-locale');
  t.is(a2.type, 'foo');
});

test('should have default route', t => {
  t.truthy(ActionFactory.fromMenuLocation({ state: {} }));
});

test.cb('should fail when route key not found', t => {
  const err = 'Can\'t find route key "foobar" in routes';

  t.throws(() => {
    ActionFactory.fromMenuLocation({ state: { menuLocation: 'foobar' } });
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

test('should provision action with user object', t => {
  const action = ActionFactory.fromMenuLocation({ state: {} });
  t.truthy(action.user);
});
