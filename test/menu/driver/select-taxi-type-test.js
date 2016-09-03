/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import SelectTaxiType from '../../../src/actions/menu/driver/select-taxi-type';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  const action = new SelectTaxiType({ i18n, user });
  t.is(action.type, 'driver-select-taxi-type');
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectTaxiType({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('driver-select-taxi-type.select_taxi_type'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'scooter');
  t.is(response.responses[1].rows[0][1].value, 'bike');
  t.is(response.responses[1].rows[0][2].value, 'car');
  t.is(response.responses[1].rows[0][0].label, i18n.__('driver-select-taxi-type.scooter'));
  t.is(response.responses[1].rows[0][1].label, i18n.__('driver-select-taxi-type.bike'));
  t.is(response.responses[1].rows[0][2].label, i18n.__('driver-select-taxi-type.car'));
});

test('should return composite response on post for scooter, bike, and car', t => {
  const reactions = ['scooter', 'bike', 'car'];
  const action = new SelectTaxiType({ i18n, user });

  for (const reaction of reactions) {
    const response = action.post(reaction);
    t.is(response.type, 'composite');
    t.is(response.responses[0].type, 'text');
    t.is(response.responses[0].message, '👌 OK!');
    t.is(response.responses[1].type, 'user-state');
    t.is(response.responses[1].state.taxiType, reaction);
    t.is(response.responses[2].type, 'redirect');
    t.is(response.responses[2].path, 'driver-explain-checkins');
  }
});

test('should return error on post with unknown reaction', t => {
  const action = new SelectTaxiType({ i18n, user });
  const response = action.post('whatever');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'error');
  t.is(response.responses[0].message, i18n.__('driver-select-taxi-type.error_only_known_type'));
});
