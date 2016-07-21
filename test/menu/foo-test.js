/* eslint-disable no-new */
import test from 'ava';
import Foo from '../../src/menu/foo';

test('can be constructed with default parameters', t => {
  new Foo({ i18n: {} });
  t.pass();
});

test('should return text response on get', t => {
  const action = new Foo({ i18n: {} });
  const response = action.get();
  t.is(response.type, 'text');
  t.is(response.message, 'You\'re located at foo action now');
});

test('should return composite response on post', t => {
  const action = new Foo({ i18n: {} });
  const response = action.post();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'default');  
});
