/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import SelectLocale from '../../src/actions/menu/select-locale';

const user = { state: {} };

test('can be constructed with default parameters', t => {
  new SelectLocale({ i18n: {}, user });
  t.pass();
});

const assertPage1 = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'Select your language (page 1/2):');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'en');
  t.is(response.responses[1].rows[0][1].value, 'es');
  t.is(response.responses[1].rows[1][0].value, 'id');
  t.is(response.responses[1].rows[1][1].value, 'pt-br');
  t.is(response.responses[1].rows[2][0].value, 'ru');
  t.is(response.responses[1].rows[2][1].value, 'page2');
};

const assertPage2 = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'Select your language (page 2/2):');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'page1');
  t.is(response.responses[1].rows[0][1].value, 'tr');
};

test('should return conditional response on get', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.get();
  t.is(response.type, 'if');
  t.is(response.condition.type, 'equals');
  t.is(response.condition.actual, undefined);
  t.is(response.condition.expected, 2);
  assertPage2(t, response.ok);
  assertPage1(t, response.err);
});

const assertConfirm = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'select-user-type');
};

const assertPost = (t, response) => {
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'if');
  t.is(response.responses[0].condition.type, 'equals');
  t.is(response.responses[0].condition.actual, 'foo');
  t.is(response.responses[0].condition.expected, 'page1');
  t.is(response.responses[0].ok.type, 'user-state');
  t.is(response.responses[0].ok.state.selectLocalePage, 1);
  t.is(response.responses[1].type, 'if');
  t.is(response.responses[1].condition.type, 'equals');
  t.is(response.responses[1].condition.actual, 'foo');
  t.is(response.responses[1].condition.expected, 'page2');
  t.is(response.responses[1].ok.type, 'user-state');
  t.is(response.responses[1].ok.state.selectLocalePage, 2);
  t.is(response.responses[2].type, 'if');
  t.is(response.responses[2].condition.type, 'in');
  t.is(response.responses[2].condition.value, 'foo');
  t.deepEqual(response.responses[2].condition.arr, ['en', 'es', 'id', 'pt-br', 'ru', 'tr']);
  assertConfirm(t, response.responses[2].ok);
  t.is(response.responses[2].condition.err, undefined);
};

test('should return conditional response on post', t => {
  const action = new SelectLocale({ i18n: {}, user });
  const response = action.post('foo');
  t.is(response.type, 'if');
  t.is(response.condition.type, 'in');
  t.is(response.condition.value, 'foo');
  t.deepEqual(response.condition.arr, ['en', 'es', 'id', 'pt-br', 'ru', 'tr', 'page1', 'page2']);
  assertPost(t, response.ok);
  t.is(response.err, undefined);
});
