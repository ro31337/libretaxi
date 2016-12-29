/* eslint-disable no-new, no-console */
import test from 'ava';
import Identity from '../../src/decorators/identity';

test('should decorate with undefined identity', t => {
  const identity = new Identity('Driver');
  t.is(identity.toString(), 'Driver');
});

test('should decorate with empty identity', t => {
  const identity = new Identity('Driver', {});
  t.is(identity.toString(), 'Driver');
});

test('should decorate with empty all props', t => {
  const identity = new Identity('Driver', { first: 'Foo', last: 'Bar', username: 'ro31337' });
  t.is(identity.toString(), 'Driver (Foo Bar @ro31337)');
});

test('should decorate with empty some props', t => {
  const identity1 = new Identity('Driver', { first: 'Foo', username: 'ro31337' });
  const identity2 = new Identity('Driver', { last: 'Bar', username: 'ro31337' });
  const identity3 = new Identity('Driver', { first: 'Foo', last: 'Bar' });
  t.is(identity1.toString(), 'Driver (Foo @ro31337)');
  t.is(identity2.toString(), 'Driver (Bar @ro31337)');
  t.is(identity3.toString(), 'Driver (Foo Bar)');
});
