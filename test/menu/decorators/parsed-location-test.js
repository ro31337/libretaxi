/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import ParsedLocation from '../../../src/actions/decorators/parsed-location';
import { ss } from '../../spec-support';

const defaultParams = { type: 'foo', i18n: {}, user: {} };

test('can be constructed with default parameters', t => {
  const origin = {};
  const action = new ParsedLocation(defaultParams, origin);
  t.pass();
});

test('should just call origin on get', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new ParsedLocation(defaultParams, origin);
  action.get();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should just call origin on t, gt with parameters', t => {
  const origin = {
    t: ss.sinon.spy(),
    gt: ss.sinon.spy(),
  };
  const action = new ParsedLocation(defaultParams, origin);
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
  const action = new ParsedLocation(defaultParams, origin);
  action.call();
  t.truthy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
});

test('should call own "post" on "call" when argument provided', t => {
  const origin = {
    get: ss.sinon.spy(),
    post: ss.sinon.spy(),
  };
  const action = new ParsedLocation(defaultParams, origin);
  action.post = ss.sinon.spy();
  action.call(31337);
  t.falsy(origin.get.calledWith());
  t.falsy(origin.post.calledWith());
  t.truthy(action.post.calledWith(31337));
});

test('should call origin on post for unprocessable data', t => {
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
  ];
  t.plan(data.length * 2);

  for (const p of data) {
    const origin = {
      get: ss.sinon.spy(),
      post: ss.sinon.spy(),
    };
    const action = new ParsedLocation(defaultParams, origin);
    action.post(p);
    t.falsy(origin.get.calledWith());
    t.truthy(origin.post.calledWith(p));
  }
});

test('should call origin with parsed coordinates when data is processable', t => {
  // array of items where:
  // item[0] - actual data
  // item[1] - expected data

  const data = [
    ['37.012345678901234,-122.012345678901234', [37.012345678901234, -122.012345678901234]],
    ['123.123,123.123', [123.123, 123.123]],
    ['123.123, 123.123', [123.123, 123.123]],
    [' 123.123, 123.123 ', [123.123, 123.123]],
    [' 123.123 , 123.123 ', [123.123, 123.123]],
    ['37.421955, -122.084058', [37.421955, -122.084058]],
    ['1, 2', [1, 2]],
    ['1.123, 2', [1.123, 2]],
    ['1, 2.123', [1, 2.123]],
    ['1, -2', [1, -2]],
    ['-1, 2', [-1, 2]],
    [[37.421955, -122.084058], [37.421955, -122.084058]],
  ];

  t.plan(data.length * 2);

  for (const item of data) {
    const origin = {
      get: ss.sinon.spy(),
      post: ss.sinon.spy(),
    };
    const action = new ParsedLocation(defaultParams, origin);
    action.post(item[0]);
    t.falsy(origin.get.calledWith());
    t.truthy(origin.post.calledWith(item[1]));
  }
});
