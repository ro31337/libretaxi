/* eslint-disable no-new */
import test from 'ava';
import ValidatedStatefulKey from '../../src/validations/validated-stateful-key';

test.cb('should throw error when parameters not specified', t => {
  const err = 'constructor parameters not specified';

  t.throws(() => {
    new ValidatedStatefulKey();
  }, err);

  t.end();
});

test.cb('should throw error when "platformType" parameter not specified', t => {
  const err = 'platformType parameter not specified';

  t.throws(() => {
    new ValidatedStatefulKey({ platformId: 123, guid: 'foo' });
  }, err);

  t.end();
});

test.cb('should throw error when "platformType" parameter not supported', t => {
  const err = 'platform type "bar" not supported';

  t.throws(() => {
    new ValidatedStatefulKey({ platformId: 123, guid: 'foo', platformType: 'bar' });
  }, err);

  t.end();
});

test.cb('should throw error when "platformId" parameter not specified', t => {
  const err = 'platformId parameter not specified';

  t.throws(() => {
    new ValidatedStatefulKey({ platformType: 'cli', guid: 'foo' });
  }, err);

  t.end();
});

test.cb('should not throw error when "guid" parameter not specified', t => {
  new ValidatedStatefulKey({ platformType: 'cli', platformId: 123 });
  t.end();
});
