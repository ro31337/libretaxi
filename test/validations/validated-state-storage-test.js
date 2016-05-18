/* eslint-disable no-new */
import test from 'ava';
import ValidatedStateStorage from '../../src/validations/validated-state-storage';

test.cb('should throw error when key not specified', t => {
  const err = 'key parameter not specified';

  t.throws(() => {
    new ValidatedStateStorage();
  }, err);

  t.end();
});
