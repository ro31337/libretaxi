/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import DriverIndex from '../../../src/actions/menu/driver/index';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new DriverIndex({ i18n, user });
  t.pass();
});

test('should return options response on get', t => {
  const action = new DriverIndex({ i18n, user });
  const response = action.get();
  t.is(response.type, 'options');
  t.is(response.rows[0][0].value, 'checkin');
  t.is(response.rows[0][1].value, 'disable_notifications');
  t.is(response.rows[0][2].value, 'settings');
  t.is(response.rows[0][0].label, i18n.__('driver-index.checkin'));
  t.is(response.rows[0][1].label, i18n.__('driver-index.disable_notifications'));
  t.is(response.rows[0][2].label, i18n.__('driver-index.settings'));
});

test('should return composite response on post for checkin', t => {
  const action = new DriverIndex({ i18n, user });

  const response = action.post('checkin');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'driver-checkin');
});

test('should return composite response on post for disable_notifications', t => {
  const action = new DriverIndex({ i18n, user });

  const response = action.post('disable_notifications');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'foo');
});

test('should return different composite response on post for settings', t => {
  const action = new DriverIndex({ i18n, user });
  const response = action.post('settings');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'redirect');
  t.is(response.responses[0].path, 'settings');
});

test('should return error on post for unknown reaction', t => {
  const action = new DriverIndex({ i18n, user });
  const response = action.post('whatever');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'error');
  t.is(response.responses[0].message, i18n.__('driver-index.unknown_choice'));
});
