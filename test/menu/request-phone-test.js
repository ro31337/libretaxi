/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import RequestPhone from '../../src/menu/request-phone';
import { i18n } from '../spec-support';

test('can be constructed with default parameters', t => {
  new RequestPhone({ i18n });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new RequestPhone({ i18n });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('request-phone.type_your_phone'));
  t.is(response.responses[1].type, 'request-phone');
});

test('should return composite response on post', t => {
  const action = new RequestPhone({ i18n });
  const response = action.post('+1 (555) 111-22-33');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'user-state');
  t.is(response.responses[1].state.phone, '+1 (555) 111-22-33');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'default');
});
