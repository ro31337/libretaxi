/* eslint-disable no-new */
import test from 'ava';
import StateKey from '../src/state-key';

test('can be constructed with default parameters', t => {
  new StateKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.pass();
});

test('should have string representation of the key', t => {
  const k = new StateKey({ platformType: 'cli', platformId: 1, guid: 'foo' });
  t.is(k.toString(), 'cli_1_foo');
});

test('should lower case string representation', t => {
  const k = new StateKey({ platformType: 'cli', platformId: 1, guid: 'FOO' });
  t.is(k.toString(), 'cli_1_foo');
});
