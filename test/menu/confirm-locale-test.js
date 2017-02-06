/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import ConfirmLocale from '../../src/actions/menu/confirm-locale';
import { i18n } from '../spec-support';

const user = { state: { locale: 'en' } };

test('can be constructed with default parameters', t => {
  new ConfirmLocale({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new ConfirmLocale({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, 'English ?');
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'yes');
  t.is(response.responses[1].rows[0][0].label, '✅ Yes');
  t.is(response.responses[1].rows[0][1].value, 'no');
  t.is(response.responses[1].rows[0][1].label, '❌ No');
  t.is(response.responses[1].defaultMessage, i18n.__('global.default_options_message'));
});

test('should return composite response on post', t => {
  const action = new ConfirmLocale({ i18n, user });
  const response = action.post(31337);
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'if');
  t.is(response.responses[0].condition.type, 'equals');
  t.is(response.responses[0].condition.actual, 31337);
  t.is(response.responses[0].condition.expected, 'yes');
  t.is(response.responses[0].ok.type, 'composite');
  t.is(response.responses[0].ok.responses[0].type, 'text');
  t.is(response.responses[0].ok.responses[0].message, '👌 OK!');
  t.is(response.responses[0].ok.responses[1].type, 'redirect');
  t.is(response.responses[0].ok.responses[1].path, 'select-user-type');
  t.falsy(response.responses[0].err);

  t.is(response.responses[1].type, 'if');
  t.is(response.responses[1].condition.type, 'equals');
  t.is(response.responses[1].condition.actual, 31337);
  t.is(response.responses[1].condition.expected, 'no');
  t.is(response.responses[1].ok.type, 'redirect');
  t.is(response.responses[1].ok.path, 'select-locale');
  t.falsy(response.responses[1].err);
});
