/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import SelectLocale from '../../src/actions/menu/select-locale';

const user = {};

test('can be constructed with default parameters', t => {
  new SelectLocale({ i18n: {}, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'Select your language:');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'en');
  t.is(response.responses[1].rows[0][1].value, 'ru');
});

test('should return composite response on post', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.post('en');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'select-user-type');
});
