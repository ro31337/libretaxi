/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import SelectVehicleType from '../../../src/actions/menu/driver/select-vehicle-type';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  const action = new SelectVehicleType({ i18n, user });
  t.is(action.type, 'driver-select-vehicle-type');
  t.pass();
});

test('should return composite response on get', t => {
  const action = new SelectVehicleType({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('driver-select-vehicle-type.select'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'car');
  t.is(response.responses[1].rows[1][0].value, 'motorbike');
  t.is(response.responses[1].rows[0][0].label, i18n.__('driver-select-vehicle-type.car'));
  t.is(response.responses[1].rows[1][0].label, i18n.__('driver-select-vehicle-type.motorbike'));
});

test('should return composite response on post for motorbike and car', t => {
  const reactions = ['motorbike', 'car'];
  const action = new SelectVehicleType({ i18n, user });

  for (const reaction of reactions) {
    const response = action.post(reaction);
    t.is(response.type, 'composite');
    t.is(response.responses[0].type, 'text');
    t.is(response.responses[0].message, '👌 OK!');
    t.is(response.responses[1].type, 'user-state');
    t.is(response.responses[1].state.vehicleType, reaction);
    t.is(response.responses[2].type, 'redirect');
    t.is(response.responses[2].path, 'driver-explain-checkins');
  }
});

test('should return error on post with unknown reaction', t => {
  const action = new SelectVehicleType({ i18n, user });
  const response = action.post('whatever');
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'error');
  t.is(response.responses[0].message, i18n.__('driver-select-vehicle-type.error_only_known_type'));
});
