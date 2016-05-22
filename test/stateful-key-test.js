/* eslint-disable no-new */
import test from 'ava';
import StatefulKey from '../src/stateful-key';

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
