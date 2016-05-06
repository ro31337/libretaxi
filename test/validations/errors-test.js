import test from 'ava';
import { ArgumentError } from '../../src/validations/errors';

test.cb('should have error message when thrown', t => {
  const err = 'something';

  t.throws(() => {
    throw new ArgumentError('something');
  }, err);

  t.end();
});

test('should have message property', t => {
  const err = new ArgumentError('something');
  t.is(err.message, 'something');
});
