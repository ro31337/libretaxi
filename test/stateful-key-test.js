/* eslint-disable no-new */
import test from 'ava';
import StatefulKey from '../src/stateful-key';
import checkNotNullTest from './helpers/check-not-null';
import checkPlatformTypeTest from './helpers/check-platform-type';

checkNotNullTest(['platformType', 'platformId'], (args) => { new StatefulKey(args); });
checkPlatformTypeTest(() => {
  new StatefulKey({ platformType: 'foo', platformId: 1 });
});

test('can be constructed with default parameters', t => {
  new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.pass();
});

test('should have string representation of the key', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.is(k.toString(), 'cli_1_foo');
});

test('should lower case string representation', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1, guid: 'FOO' });
  t.is(k.toString(), 'cli_1_foo');
});

test('should generate key without guid', t => {
  const k = new StatefulKey({ platformType: 'cli', platformId: 1 });
  t.is(k.toString(), 'cli_1');
});
