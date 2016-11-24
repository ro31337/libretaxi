/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import DriverIndex from '../../../src/actions/menu/driver/index';
import { i18n } from '../../spec-support';

const user = { state: { muted: 'foo' } };

test('can be constructed with default parameters', t => {
  new DriverIndex({ i18n, user });
  t.pass();
});

test('should return options response on get', t => {
  const action = new DriverIndex({ i18n, user });
  const response = action.get();
  t.is(response.type, 'if');
  t.is(response.condition.type, 'equals');
  t.is(response.condition.actual, 'foo');
  t.is(response.condition.expected, true);

  const okResponse = response.ok;
  const errResponse = response.err;

  t.is(okResponse.type, 'options');
  t.is(okResponse.rows[0][0].value, 'checkin');
  t.is(okResponse.rows[1][0].value, 'unmute');
  t.is(okResponse.rows[2][0].value, 'settings');
  t.is(okResponse.rows[0][0].label, i18n.__('driver-index.checkin'));
  t.is(okResponse.rows[1][0].label, i18n.__('driver-index.unmute'));
  t.is(okResponse.rows[2][0].label, i18n.__('driver-index.settings'));

  t.is(errResponse.type, 'options');
  t.is(errResponse.rows[0][0].value, 'checkin');
  t.is(errResponse.rows[1][0].value, 'mute');
  t.is(errResponse.rows[2][0].value, 'settings');
  t.is(errResponse.rows[0][0].label, i18n.__('driver-index.checkin'));
  t.is(errResponse.rows[1][0].label, i18n.__('driver-index.mute'));
  t.is(errResponse.rows[2][0].label, i18n.__('driver-index.settings'));
});

test('should return composite response on post', t => {
  const action = new DriverIndex({ i18n, user });

  const response = action.post('bar');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');

  t.is(response.responses[1].type, 'if');
  t.is(response.responses[1].condition.type, 'equals');
  t.is(response.responses[1].condition.actual, 'bar');
  t.is(response.responses[1].condition.expected, 'checkin');
  t.is(response.responses[1].ok.type, 'redirect');
  t.is(response.responses[1].ok.path, 'driver-checkin');
  t.falsy(response.responses[1].err);

  t.is(response.responses[2].type, 'if');
  t.is(response.responses[2].condition.type, 'equals');
  t.is(response.responses[2].condition.actual, 'bar');
  t.is(response.responses[2].condition.expected, 'mute');
  t.is(response.responses[2].ok.type, 'redirect');
  t.is(response.responses[2].ok.path, 'driver-mute');
  t.falsy(response.responses[2].err);

  t.is(response.responses[3].type, 'if');
  t.is(response.responses[3].condition.type, 'equals');
  t.is(response.responses[3].condition.actual, 'bar');
  t.is(response.responses[3].condition.expected, 'unmute');
  t.is(response.responses[3].ok.type, 'redirect');
  t.is(response.responses[3].ok.path, 'driver-unmute');
  t.falsy(response.responses[3].err);

  t.is(response.responses[4].type, 'if');
  t.is(response.responses[4].condition.type, 'equals');
  t.is(response.responses[4].condition.actual, 'bar');
  t.is(response.responses[4].condition.expected, 'settings');
  t.is(response.responses[4].ok.type, 'redirect');
  t.is(response.responses[4].ok.path, 'settings');
  t.falsy(response.responses[4].err);

  t.is(response.responses[5].type, 'if');
  t.is(response.responses[5].condition.type, 'not-in');
  t.is(response.responses[5].condition.value, 'bar');
  t.deepEqual(response.responses[5].condition.arr, ['checkin', 'mute', 'unmute', 'settings']);
  t.is(response.responses[5].ok.type, 'error');
  t.is(response.responses[5].ok.message, i18n.__('driver-index.unknown_choice'));
  t.falsy(response.responses[5].err);
});
