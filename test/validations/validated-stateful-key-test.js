/* eslint-disable no-new */
import test from 'ava';
import Mixin from '../../src/validations/validated-stateful-key';
import { mix } from 'mixwith';

class ValidatedStatefulKey extends mix(class {}).with(Mixin) {}

test.cb('should throw error when "platformType" parameter not supported', t => {
  const err = 'platform type "bar" not supported';

  t.throws(() => {
    new ValidatedStatefulKey({ platformId: 123, guid: 'foo', platformType: 'bar' });
  }, err);

  t.end();
});
