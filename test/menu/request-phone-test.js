/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import RequestPhone from '../../src/actions/menu/request-phone';
import { i18n } from '../spec-support';

test('can be constructed with default parameters', t => {
  new RequestPhone({ i18n, user: {} });
  t.pass();
});

test('should return composite response on get', t => {
  const action = new RequestPhone({ i18n, user: {} });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('request-phone.type_your_phone'));
  t.is(response.responses[1].type, 'request-phone');
});

test('should return composite response on post for driver', t => {
  const user = { state: { userType: 'driver' } };

  const action = new RequestPhone({ i18n, user });
  const response = action.post('+1 (555) 111-22-33');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.phone, '+1 (555) 111-22-33');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, '👌 OK!');
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-select-vehicle-type');
});

test('should return different composite response on post for passenger', t => {
  const user = { state: { userType: 'passenger' } };

  const action = new RequestPhone({ i18n, user });
  const response = action.post('+1 (555) 111-22-33');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.phone, '+1 (555) 111-22-33');
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('request-phone.all_set'));
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'passenger-index');
});

test.cb('should throw error on post for unknown user type', t => {
  const user = { state: { userType: 'unknown' } };
  const action = new RequestPhone({ i18n, user });
  const err = 'unsupported user type';

  t.plan(1);
  t.throws(() => { action.post('whatever'); }, err);
  t.end();
});
