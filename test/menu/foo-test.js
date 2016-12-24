/* eslint-disable no-new */
import test from 'ava';
import Foo from '../../src/actions/menu/foo';

const user = {};

test('can be constructed with default parameters', t => {
  new Foo({ i18n: {}, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new Foo({ i18n: {}, user });
  const response = action.call();
  t.is(response.type, 'redirect');
  t.is(response.path, 'default');
});
