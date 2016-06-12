/* eslint-disable no-new */
import test from 'ava';
import { mix } from 'mixwith';
import Mixin from '../../src/validations/validated-response';

class ValidatedResponse extends mix(Object).with(Mixin) {
}

test.cb('should throw error when parameters not specified', t => {
  const err = 'constructor parameters not specified';

  t.throws(() => {
    new ValidatedResponse();
  }, err);

  t.end();
});

test.cb('should throw error when "type" parameter not specified', t => {
  const err = 'type parameter not specified';

  t.throws(() => {
    new ValidatedResponse({ foo: 123 });
  }, err);

  t.end();
});

test.cb('should throw error when type not supported', t => {
  const err = 'response with type "foo" not supported';

  t.throws(() => {
    new ValidatedResponse({ type: 'foo' });
  }, err);

  t.end();
});
