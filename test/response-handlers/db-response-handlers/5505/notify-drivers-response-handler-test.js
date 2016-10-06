/* eslint-disable no-new, no-unused-vars, max-len */
import test from 'ava';
import NotifyDriversResponseHandler from '../../../../src/response-handlers/submit-order/notify-drivers-response-handler';
import NotifyDriversResponse from '../../../../src/responses/submit-order/notify-drivers-response';
import checkNotNullTest from '../../../helpers/check-not-null.js';
import FirebaseServer from 'firebase-server';
import firebaseDB from '../../../../src/firebase-db';
import { ss } from '../../../spec-support';
import sinon from 'sinon';
import User from '../../../../src/user';
import UserFactory from '../../../../src/factories/user-factory';

let server = null;
const response = new NotifyDriversResponse({ passengerKey: 'cli_1' });
const load = (userKey) => { // eslint-disable-line arrow-body-style
  return UserFactory.fromUserKey(userKey).load();
};

test.before(() => {
  server = new FirebaseServer(5505, 'localhost.firebaseio.test', {
    users: {
      cli_1: {
        userType: 'passenger',
        currentOrderKey: '53845282-693f-4e7a-8479-87d421db6b94',
      },
      cli_2: {
        userType: 'driver',
        muted: true,
      },
      cli_3: {
        userType: 'driver',
        muted: false,
        vehicleType: 'motorbike',
      },
      cli_4: {
        userType: 'driver',
        muted: false,
        vehicleType: 'motorbike',
        menuLocation: 'settings',
      },
      cli_5: {
        userType: 'driver',
        muted: false,
        vehicleType: 'motorbike',
        menuLocation: 'driver-index',
      },
    },
    orders: {
      '53845282-693f-4e7a-8479-87d421db6b94': {
        foo: 'bar',
      },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

checkNotNullTest('response', (args) => { new NotifyDriversResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new NotifyDriversResponseHandler({ response: {} });
  t.pass();
});

test.cb('should load order and query drivers when called', t => {
  t.plan(2);
  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    const assert = () => {
      t.is(handler.order.state.foo, 'bar'); // eslint-disable-line no-use-before-define
      t.truthy(handler.queryDrivers.calledWith());  // eslint-disable-line no-use-before-define
      t.end();
    };

    const handler = new NotifyDriversResponseHandler({ response, user });
    handler.queryDrivers = ss.sinon.spy();
    handler.call(assert);
  });
});

test('should query drivers with geofire and setup key_entered callback', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const geoFireQuery = {
    on: ss.sinon.spy(),
  };
  handler.geoFire = {
    query: ss.sinon.stub().returns(geoFireQuery),
  };
  handler.order = { state: { passengerLocation: 'foo' } };
  handler.queryDrivers();
  t.truthy(handler.geoFire.query.calledWith({ center: 'foo', radius: 20 }));
  t.truthy(geoFireQuery.on.calledWith('key_entered', handler.keyEntered));
});

test('should call notify driver method on key_entered callback', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  handler.notifyDriver = ss.sinon.spy();
  handler.keyEntered('key', 'location', 'distance');
  t.truthy(handler.notifyDriver.calledWith('key', 'distance'));
});

test.cb('should not notify driver when order is not new', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => { t.fail(); };
  const fail = (reason) => { t.is(reason, 'order is not new'); t.end(); };
  handler.order = { state: { status: 'old' } };
  handler.notifyDriver('cli_1', 1, fail, success);
});

test.cb('should not notify driver when userType is not \'driver\'', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => { t.fail(); };
  const fail = (reason) => { t.is(reason, 'userType is not \'driver\''); t.end(); };
  handler.order = { state: { status: 'new' } };

  load('cli_1').then((user) => {
    handler.notifyDriver('cli_1', 1, fail, success);
  });
});

test.cb('should not notify driver when driver is muted', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => { t.fail(); };
  const fail = (reason) => { t.is(reason, 'driver is muted'); t.end(); };
  handler.order = { state: { status: 'new' } };

  load('cli_2').then((user) => {
    handler.notifyDriver('cli_2', 1, fail, success);
  });
});

test.cb('should not notify driver when vehicle types don\'t match', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => { t.fail(); };
  const fail = (reason) => { t.is(reason, 'vehicle types don\'t match'); t.end(); };
  handler.order = { state: { status: 'new', requestedVehicleType: 'car' } };

  load('cli_3').then((user) => {
    handler.notifyDriver('cli_3', 1, fail, success);
  });
});

test.cb('should not notify driver when driver is busy', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => { t.fail(); };
  const fail = (reason) => { t.is(reason, 'driver is busy'); t.end(); };
  handler.order = { state: { status: 'new', requestedVehicleType: 'motorbike' } };

  load('cli_4').then((user) => {
    handler.notifyDriver('cli_4', 1, fail, success);
  });
});

test.cb('should notify driver when matched', t => {
  const handler = new NotifyDriversResponseHandler({ response });
  const success = () => {
    t.truthy(handler.queue.create.calledWith({
      userKey: 'cli_5',
      arg: { orderKey: 123, distance: 1, from: [1, 2], to: 'foobar' },
      route: 'driver-order-new',
    }));
    t.end();
  };
  const fail = () => { t.fail(); };
  handler.order = {
    orderKey: 123,
    state: {
      status: 'new',
      requestedVehicleType: 'motorbike',
      passengerLocation: [1, 2],
      passengerDestination: 'foobar',
    },
  };
  handler.queue = { create: ss.sinon.spy() };

  load('cli_5').then((user) => {
    handler.notifyDriver('cli_5', 1, fail, success);
  });
});
