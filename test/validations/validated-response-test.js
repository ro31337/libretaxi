/* eslint-disable no-new */
import test from 'ava';
import { mix } from 'mixwith';
import Mixin from '../../src/validations/validated-response';

class ValidatedResponse extends mix(class {}).with(Mixin) {}

test.cb('should throw error when type not supported', t => {
  const err = 'response with type "foo" not supported';

  t.throws(() => {
    new ValidatedResponse({ type: 'foo' });
  }, err);

  t.end();
});
