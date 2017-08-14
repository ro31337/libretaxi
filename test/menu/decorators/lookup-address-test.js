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

/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import LookupAddress from '../../../src/actions/decorators/lookup-address';
import { ss } from '../../spec-support';

const defaultParams = { type: 'foo', i18n: {}, user: {} };
const address = '702 marshal street, redwood city';
const settings = { GEOCODING_API_KEY: 31337 };

let origin;
test.beforeEach(() => {
  origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
    t: ss.sinon.spy(),
    gt: ss.sinon.spy(),
  };
});

test('can be constructed with default parameters', t => {
  const action = new LookupAddress(defaultParams, origin);
  t.pass();
});

test('should just call origin on get', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.get();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should just call origin on t, gt with parameters', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.t(1, 2, 3);
  action.gt(11, 22, 33);
  t.truthy(origin.t.calledWith(1, 2, 3));
  t.truthy(origin.gt.calledWith(11, 22, 33));
});

test('should call "get" on "call" when no argument provided', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.call();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should call own "post" on "call" when argument provided', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.post = ss.sinon.spy();
  action.call(31337);
  t.falsy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
  t.truthy(action.post.calledWith(31337));
});

test('should not call promise when address is not string', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.post = ss.sinon.spy();
  action.promise = ss.sinon.spy();
  action.call(31337);
  t.falsy(action.promise.calledWith());
});

test('internally should use promise when address is string', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.promise = ss.sinon.stub().returns(true);
  action.call(address);
  t.truthy(action.promise.calledWith(address));
});

test('should return promise response', t => {
  const action = new LookupAddress(defaultParams, origin);
  action.promise = ss.sinon.stub().returns(true);
  const response = action.call(address);
  t.is(response.type, 'promise');
});

test.cb('should resolve promise with the same address when geocoder returns error', t => {
  t.plan(1);
  const getGeocoder = () => ({
    geocode: (_address, cb) => { cb(true); },
  });
  const action = new LookupAddress(defaultParams, origin, settings, getGeocoder);
  action
    .promise(address)
    .then((resolvedAddress) => {
      t.is(resolvedAddress, address);
      t.end();
    });
});

test.cb('should resolve promise with coordinates address when geocoder returns no error', t => {
  t.plan(1);
  const obj = [{ latitude: 1, longitude: 2 }];
  const getGeocoder = () => ({
    geocode: (_address, cb) => { cb(false, obj); },
  });
  const action = new LookupAddress(defaultParams, origin, settings, getGeocoder);
  action
    .promise(address)
    .then((resolvedAddress) => {
      t.deepEqual(resolvedAddress, [1, 2]);
      t.end();
    });
});

test.cb('should request geocoder with GEOCODING_API_KEY from settings', t => {
  t.plan(1);
  const getGeocoder = (options) => {
    t.is(options.apiKey, 31337);
    t.end();
    return { geocode: () => {} };
  };
  const action = new LookupAddress(defaultParams, origin, settings, getGeocoder);
  action
    .promise(address)
    .then(() => {});
});

test.cb('should not fail when geocoder returns no error, but empty array', t => {
  t.plan(1);
  const getGeocoder = () => ({
    geocode: (_address, cb) => { cb(false, []); },
  });
  const action = new LookupAddress(defaultParams, origin, settings, getGeocoder);
  action
    .promise(address)
    .then((resolvedAddress) => {
      t.is(resolvedAddress, address);
      t.end();
    });
});
