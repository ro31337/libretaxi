/* eslint-disable no-new */
import test from 'ava';
import ValidatedUser from '../../src/validations/validated-user';

test.cb('should throw error when parameters not specified', t => {
  const err = 'constructor parameters not specified';

  t.throws(() => {
    new ValidatedUser();
  }, err);

  t.end();
});

test.cb('should throw error when platformType not specified', t => {
  const err = 'platformType parameter not specified';

  t.throws(() => {
    new ValidatedUser({ platformId: 1 });
  }, err);

  t.end();
});

test.cb('should throw error when platformId not specified or empty', t => {
  const err = 'platformId parameter not specified';

  t.throws(() => {
    new ValidatedUser({ platformType: 'cli' });
  }, err);

  t.throws(() => {
    new ValidatedUser({ platformType: 'cli', platformId: '' });
  }, err);

  t.end();
});

test.cb('should throw error when platformType not supported', t => {
  const err = 'platform type "something" not supported';

  t.throws(() => {
    new ValidatedUser({ platformId: 1, platformType: 'something' });
  }, err);

  t.end();
});
