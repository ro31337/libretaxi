/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import ActionFactory from '../src/factories/action-factory';

// update next test cases when you have more routes in `routes.js`

test('should return routes by route', t => {
  const user = { state: {} };
  const a1 = ActionFactory.fromRoute({ route: 'select-locale', user });
  const a2 = ActionFactory.fromRoute({ route: 'foo', user });
  const a3 = ActionFactory.fromRoute({ route: 'default', user });
  const a4 = ActionFactory.fromRoute({ route: 'select-user-type', user });
  const a5 = ActionFactory.fromRoute({ route: 'request-phone', user });
  const a6 = ActionFactory.fromRoute({ route: 'passenger-index', user });
  const a7 = ActionFactory.fromRoute({ route: 'driver-select-vehicle-type', user });
  const a8 = ActionFactory.fromRoute({ route: 'settings', user });
  const a9 = ActionFactory.fromRoute({ route: 'passenger-request-location', user });
  const a10 = ActionFactory.fromRoute({ route: 'passenger-request-destination', user });
  const a11 = ActionFactory.fromRoute({ route: 'order-submitted', user });
  const a12 = ActionFactory.fromRoute({ route: 'blank-screen', user });
  const a13 = ActionFactory.fromRoute({ route: 'order-cancelled', user });
  const a14 = ActionFactory.fromRoute({ route: 'redirect', user });
  const a15 = ActionFactory.fromRoute({ route: 'driver-explain-checkins', user });
  const a16 = ActionFactory.fromRoute({ route: 'driver-request-location', user });
  const a17 = ActionFactory.fromRoute({ route: 'driver-explain-whats-next', user });
  const a18 = ActionFactory.fromRoute({ route: 'driver-index', user });
  const a19 = ActionFactory.fromRoute({ route: 'driver-checkin', user });
  const a20 = ActionFactory.fromRoute({ route: 'driver-mute', user });
  const a21 = ActionFactory.fromRoute({ route: 'driver-unmute', user });
  const a22 = ActionFactory.fromRoute({ route: 'passenger-request-price', user });
  const a23 = ActionFactory.fromRoute({ route: 'passenger-contact-new-number', user });
  const a24 = ActionFactory.fromRoute({ route: 'save-and-redirect', user });
  const a25 = ActionFactory.fromRoute({ route: 'passenger-contact-driver-price', user });
  const a26 = ActionFactory.fromRoute({ route: 'driver-order-set-price', user });
  const a27 = ActionFactory.fromRoute({ route: 'passenger-verify-location', user });
  const a28 = ActionFactory.fromRoute({ route: 'passenger-verify-cash', user });
  const a29 = ActionFactory.fromRoute({ route: 'driver-request-radius', user });

  t.is(a1.type, 'select-locale');
  t.is(a2.type, 'foo');
  t.is(a3.type, 'select-locale');
  t.is(a4.type, 'select-user-type');
  t.is(a5.type, 'request-phone');
  t.is(a6.type, 'passenger-index');
  t.is(a7.type, 'driver-select-vehicle-type');
  t.is(a8.type, 'foo');
  t.is(a9.type, 'passenger-request-location');
  t.is(a10.type, 'passenger-request-destination');
  t.is(a11.type, 'order-submitted');
  t.is(a12.type, 'blank-screen');
  t.is(a13.type, 'order-cancelled');
  t.is(a14.type, 'redirect');
  t.is(a15.type, 'driver-explain-checkins');
  t.is(a16.type, 'driver-request-location');
  t.is(a17.type, 'driver-explain-whats-next');
  t.is(a18.type, 'driver-index');
  t.is(a19.type, 'driver-checkin');
  t.is(a20.type, 'driver-mute');
  t.is(a21.type, 'driver-unmute');
  t.is(a22.type, 'passenger-request-price');
  t.is(a23.type, 'passenger-contact-new-number');
  t.is(a24.type, 'save-and-redirect');
  t.is(a25.type, 'passenger-contact-driver-price');
  t.is(a26.type, 'driver-order-set-price');
  t.is(a27.type, 'passenger-verify-location');
  t.is(a28.type, 'passenger-verify-cash');
  t.is(a29.type, 'driver-request-radius');
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
