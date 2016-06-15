/* eslint-disable no-new */
import test from 'ava';
import checkPlatformType from '../../src/validations/check-platform-type';
import { mix } from 'mixwith';

class Foo extends mix(class {}).with(checkPlatformType) {}

test.cb('should throw error when \'platformType\' parameter not supported', t => {
  const err = 'platform type \'bar\' not supported';
  t.throws(() => { new Foo({ platformType: 'bar' }); }, err);
  t.end();
});

test.cb('should not support empty or unspecified platform', t => {
  const err = '\'platformType\' parameter not specified';
  t.throws(() => { new Foo({ platformType: '' }); }, err);
  t.throws(() => { new Foo(); }, err);
  t.throws(() => { new Foo({}); }, err);
  t.end();
});

test('should support \'cli\' platform', t => {
  new Foo({ platformType: 'cli' });
  t.pass();
});
