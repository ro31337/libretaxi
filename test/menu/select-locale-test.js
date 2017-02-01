/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import SelectLocale from '../../src/actions/menu/select-locale';

const user = {};

test('can be constructed with default parameters', t => {
  new SelectLocale({ i18n: {}, user });
  t.pass();
});

const assertGet = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'Select your language:');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'en');
  t.is(response.responses[1].rows[0][1].value, 'es');
  t.is(response.responses[1].rows[1][0].value, 'id');
  t.is(response.responses[1].rows[1][1].value, 'pt-br');
  t.is(response.responses[1].rows[2][0].value, 'ru');
  t.is(response.responses[1].rows[2][1].value, 'tr');
  t.is(response.responses[1].rows[3][0].value, 'fr');
};

test('should return composite response on get', t => {
  const action = new SelectLocale({ i18n: {}, user });
  assertGet(t, action.get());
});

test('should return composite response on post', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.post('en');
  t.is(response.type, 'if');
  t.is(response.condition.type, 'in');
  t.deepEqual(response.condition.arr, ['en', 'es', 'id', 'pt-br', 'ru', 'tr', 'fr']);
  t.is(response.condition.value, 'en');
  t.is(response.ok.type, 'composite');
  t.is(response.ok.responses[0].type, 'user-state');
  t.is(response.ok.responses[1].type, 'text');
  t.is(response.ok.responses[1].message, '👌 OK!');
  t.is(response.ok.responses[2].type, 'redirect');
  t.is(response.ok.responses[2].path, 'select-user-type');
  assertGet(t, response.err);
});
