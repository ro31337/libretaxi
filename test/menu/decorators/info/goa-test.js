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
import routes from '../../../../src/routes'; // to aviod circular dependencies
import GoaInfo from '../../../../src/actions/decorators/info/goa';
import { ss } from '../../../spec-support';

const defaultParams = { type: 'foo', i18n: {}, user: { state: { locale: 'ru' } } };

test('can be constructed with default parameters', t => {
  const origin = {};
  const action = new GoaInfo(defaultParams, origin);
  t.pass();
});

test('should just call origin on get', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new GoaInfo(defaultParams, origin);
  action.get();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should just call origin on t, gt with parameters', t => {
  const origin = {
    t: ss.sinon.spy(),
    gt: ss.sinon.spy(),
  };
  const action = new GoaInfo(defaultParams, origin);
  action.t(1, 2, 3);
  action.gt(11, 22, 33);
  t.truthy(origin.t.calledWith(1, 2, 3));
  t.truthy(origin.gt.calledWith(11, 22, 33));
});

test('should call "get" on "call" when no argument provided', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new GoaInfo(defaultParams, origin);
  action.call();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should call own "post" on "call" when argument provided', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new GoaInfo(defaultParams, origin);
  action.post = ss.sinon.spy();
  action.call(31337);
  t.falsy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
  t.truthy(action.post.calledWith(31337));
});

test('should call origin on post', t => {
  const data = [
    123,
    'asd',
    0,
    -123,
    [1, 2],
    { foo: 31337 },
    '1234.0123, 1234.0123',
    '123.abc, 123.abc',
    undefined,
    '',
    ['37.012345678901234,-122.012345678901234', '37.012345678901234,-122.012345678901234'],
    ['37.421955, -122.084058', '37.421955, -122.084058'],
    [[37.421955, -122.084058], [37.421955, -122.084058]],
  ];
  t.plan(data.length * 2);

  for (const p of data) {
    const origin = {
      get: ss.sinon.spy(),
      post: ss.sinon.spy(),
    };
    const action = new GoaInfo(defaultParams, origin);
    action.post(p);
    t.falsy(origin.get.calledWith());
    t.truthy(origin.post.calledWith(p));
  }
});

test('should return composite object with if', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new GoaInfo(defaultParams, origin);
  const r = action.post(31337);
  t.is(r.type, 'composite');
  t.is(r.responses.length, 2);
  t.is(r.responses[0].type, 'if');
});
