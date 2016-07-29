/* eslint-disable no-new */
import test from 'ava';
import Foo from '../../src/menu/foo';

const user = {};

test('can be constructed with default parameters', t => {
  new Foo({ i18n: {}, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new Foo({ i18n: {}, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'default');
});
