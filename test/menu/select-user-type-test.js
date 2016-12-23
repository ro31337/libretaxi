/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import SelectUserType from '../../src/actions/menu/select-user-type';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new SelectUserType({ i18n, user });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectUserType({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('select-user-type.who_you_are'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'driver');
  t.is(response.responses[1].rows[1][0].value, 'passenger');
});

test('should return composite response on post', t => {
  const action = new SelectUserType({ i18n, user });
  const response = action.post('driver');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.userType, 'driver');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'request-phone');
});
