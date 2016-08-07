/* eslint-disable no-new */
import test from 'ava';
import User from '../src/user';
import checkNotNullTest from './helpers/check-not-null';
import checkPlatformTypeTest from './helpers/check-platform-type';

checkNotNullTest(['platformType', 'platformId'], (args) => { new User(args); });
checkPlatformTypeTest(() => {
  new User({ platformType: 'foo', platformId: 1 });
});

test('user can be constructed with default parameters', t => {
  new User({ platformType: 'cli', platformId: 1 });
  t.pass();
});

test('saves userKey', t => {
  const u = new User({ platformType: 'cli', platformId: 1 });
  t.is(u.userKey, 'cli_1');
});

test('user can be constructed with extra parameters', t => {
  new User({ platformType: 'cli', platformId: 1, extra: 555 });
  t.pass();
});

test('user parameters should be accessible from outside', t => {
  const u = new User({ platformType: 'cli', platformId: 1, extra: 555 });
  t.is(u.platformType, 'cli');
  t.is(u.platformId, 1);
  t.is(u.extra, 555);
  t.pass();
});

test('should set stateful params', t => {
  const u = new User({ platformType: 'cli', platformId: 1 });
  t.truthy(u.stateful);
  t.is(u.stateful.key, 'cli_1');
  t.is(u.stateful.table, 'users');
  t.pass();
});
