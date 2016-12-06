/* eslint-disable no-new, no-unused-vars, max-len, no-use-before-define */
import test from 'ava';
import CheckinResponseHandler from '../../../../src/response-handlers/checkin-response-handler';
import CheckinResponse from '../../../../src/responses/checkin-response';
import checkNotNullTest from '../../../helpers/check-not-null.js';
import FirebaseServer from 'firebase-server';
import firebaseDB from '../../../../src/firebase-db';
import { ss } from '../../../spec-support';
import sinon from 'sinon';
import { loadUser } from '../../../../src/factories/user-factory';
import { loadOrder } from '../../../../src/factories/order-factory';

let server = null;
const response = new CheckinResponse({ driverKey: 'cli_1' });

test.before(() => {
  server = new FirebaseServer(5506, 'localhost.firebaseio.test', {
    users: {
      cli_1: {
        userType: 'driver',
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

checkNotNullTest('response', (args) => { new CheckinResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new CheckinResponseHandler({ response: {} });
  t.pass();
});

test.cb('should load driver and query orders when called', t => {
  t.plan(2);

  const assert = () => {
    t.is(handler.driver.userKey, 'cli_1');
    t.truthy(handler.queryOrders.calledWith());
    t.end();
  };

  const handler = new CheckinResponseHandler({ response });
  handler.queryOrders = ss.sinon.spy();
  handler.call(assert);
});

test('should query orders with geofire and setup key_entered callback', t => {
  const handler = new CheckinResponseHandler({ response });
  const geoFireQuery = {
    on: ss.sinon.spy(),
  };
  handler.geoFire = {
    query: ss.sinon.stub().returns(geoFireQuery),
  };
  handler.driver = { state: { location: 'foo' } };
  handler.queryOrders();
  t.truthy(handler.geoFire.query.calledWith({ center: 'foo', radius: 20 }));
  t.truthy(geoFireQuery.on.calledWith('key_entered', handler.keyEntered));
});

test.cb('should call notify driver method on key_entered callback', t => {
  t.plan(1);
  const spy = ss.sinon.spy();
  const handler = new CheckinResponseHandler({ response, notifyDriver: { call: spy } });
  handler.driver = { userKey: 'cli_1' };
  handler.keyEntered('53845282-693f-4e7a-8479-87d421db6b94', 'location', 'distance');
  loadOrder('53845282-693f-4e7a-8479-87d421db6b94').then((order) => {
    t.truthy(spy.calledWith('cli_1', 'distance', order));
    t.end();
  });
});
