/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import test from 'ava';
import ActionFactory from '../src/action-factory';

test('should return routes by menu location', t => {
  // update here when you have more routes
  t.truthy(ActionFactory.fromMenuLocation('select-locale'));
});

test('should have default route', t => {
  t.truthy(ActionFactory.fromMenuLocation());
});

test.cb('should fail when route key not found', t => {
  const err = 'Can\'t find route key "foo" in routes';

  t.throws(() => {
    ActionFactory.fromMenuLocation('foo');
  }, err);

  t.end();
});
