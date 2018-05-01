/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* eslint-disable no-new, max-len, arrow-body-style, no-param-reassign */
import test from 'ava';
import NotifyDriver from '../../../src/response-handlers/support/notify-driver';
import { ss } from '../../spec-support';

test('can be constructed with default parameters', t => {
  new NotifyDriver();
  t.pass();
});

const loadUser = (user) => {
  const then = (f) => {
    f(user);
  };
  return () => { return { then }; };
};

const shouldFail = (t, failReason, user, order) => {
  t.plan(1);
  if (!order.isNotified) order.isNotified = () => { return false; };
  const successCallback = () => { t.fail(); };
  const failCallback = (reason) => { t.is(reason, failReason); t.end(); };
  const subject = new NotifyDriver({ successCallback, failCallback, loadUser: loadUser(user) });
  subject.call('cli_1', 1, order);
};

test.cb('should not notify driver when order is not new', t => {
  shouldFail(t, 'order is not new', {}, { state: { status: 'old' } });
});

test.cb('should not notify driver when order is stale', t => {
  shouldFail(
    t,
    'order is stale',
    {},
    { state: { status: 'new', createdAt: (new Date).getTime() - 15 * 60 * 1000 - 1 } }
  );
});

test.cb('should not notify driver when driver was notified already', t => {
  const isNotified = () => { return true; };
  shouldFail(
    t,
    'driver was already notified',
    {},
    { state: { status: 'new', createdAt: (new Date).getTime() }, isNotified }
  );
});

test.cb('should not notify driver when userType is not \'driver\'', t => {
  shouldFail(
    t,
    'userType is not \'driver\'',
    { state: { userType: 'passenger' } },
    { state: { status: 'new', createdAt: (new Date).getTime() } },
  );
});

test.cb('should not notify driver when driver is muted', t => {
  shouldFail(
    t,
    'driver is muted',
    { state: { userType: 'driver', muted: true } },
    { state: { status: 'new', createdAt: (new Date).getTime() } },
  );
});

test.cb('should not notify driver when vehicle types don\'t match', t => {
  shouldFail(
    t,
    'vehicle types don\'t match',
    { state: { userType: 'driver', vehicleType: 'motorbike' } },
    { state: { status: 'new', requestedVehicleType: 'car', createdAt: (new Date).getTime() } },
  );
});

test.cb('should not notify driver when driver is busy', t => {
  shouldFail(
    t,
    'driver is busy',
    { state: { userType: 'driver', vehicleType: 'car', menuLocation: 'settings' } },
    { state: { status: 'new', requestedVehicleType: 'car', createdAt: (new Date).getTime() } },
  );
});

test.cb('should not notify driver when radius is less than distance to passenger', t => {
  shouldFail(
    t,
    'distance 1 is greater than driver\'s preferred radius 0.5',
    {
      state: {
        userType: 'driver',
        vehicleType: 'car',
        menuLocation: 'driver-index',
        radius: 0.5,
      },
    },
    { state: { status: 'new', requestedVehicleType: 'car', createdAt: (new Date).getTime() } },
  );
});

test.cb('should notify driver when matched', t => {
  t.plan(3);
  const saveSpy = ss.sinon.spy();
  const markNotifiedSpy = ss.sinon.spy();
  const queue = { create: ss.sinon.spy() };
  const successCallback = () => {
    t.truthy(queue.create.calledWith({
      userKey: 'cli_1',
      arg: {
        orderKey: 123,
        distance: 1,
        from: [1, 2],
        to: 'foobar',
        price: 50,
        passengerKey: 'cli_123',
      },
      route: 'driver-order-new',
    }));
    t.truthy(saveSpy.calledWith());
    t.truthy(markNotifiedSpy.calledWith('cli_1'));
    t.end();
  };
  const failCallback = () => { t.fail(); };
  const order = {
    orderKey: 123,
    state: {
      status: 'new',
      requestedVehicleType: 'car',
      passengerLocation: [1, 2],
      passengerDestination: 'foobar',
      price: 50,
      passengerKey: 'cli_123',
      createdAt: (new Date).getTime(),
    },
    save: saveSpy,
    isNotified: () => { return false; },
    markNotified: markNotifiedSpy,
  };
  const user = {
    state: {
      radius: 1,
      userType: 'driver',
      vehicleType: 'car',
      menuLocation: 'driver-index',
    },
  };
  const subject = new NotifyDriver({
    successCallback,
    failCallback,
    loadUser: loadUser(user),
    queue,
  });
  subject.call('cli_1', 1, order);
});
