/* eslint-disable no-new, no-console */
import test from 'ava';
import InlineButtonCallback from '../../../src/response-handlers/common/inline-button-callback'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
// import hotkeys from '../../../src/cli-hotkeys';
import { ss } from '../../spec-support';
// import sinon from 'sinon';
import UserFactory from '../../../src/factories/user-factory';

checkNotNullTest(['label', 'value', 'expectedMenuLocation'],
  (args) => { new InlineButtonCallback(args); });

test('can be constructed with default parameters', t => {
  const cb = new InlineButtonCallback({ label: 'One', value: JSON.stringify({ foo: 'bar' }),
    expectedMenuLocation: 'foobar' });
  t.is(cb.type, 'inline-button-callback');
  t.is(cb.label, 'One');
  t.is(cb.value, '{"foo":"bar"}');
  t.is(cb.expectedMenuLocation, 'foobar');
});

test.cb('should create message and post to the queue', t => {
  const queue = {
    create: (obj) => {
      t.is(obj.userKey, 'cli_1');
      t.deepEqual(obj.arg, { foo: 'bar' });
      t.is(obj.route, 'test-route');
      t.end();
    },
  };

  const cb = new InlineButtonCallback({
    label: 'One',
    value: JSON.stringify({ userKey: 'cli_1', arg: { foo: 'bar' }, route: 'test-route' }),
    expectedMenuLocation: 'foobar',
    queue });

  const then = (f) => {
    t.truthy(f);
    const user = { state: { menuLocation: 'foobar' } };
    f(user);
  };

  // stub UserFactory and return pre-defined user object
  const myUserFactory = {};
  const fromUserKey = ss.sinon.stub().returns(myUserFactory);
  const load = ss.sinon.stub().returns(myUserFactory);
  Object.assign(myUserFactory, { fromUserKey, load, then });
  UserFactory.fromUserKey = fromUserKey;

  cb.call();
});
