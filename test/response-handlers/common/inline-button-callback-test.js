/* eslint-disable no-new, no-console, arrow-body-style */
import test from 'ava';
import InlineButtonCallback from '../../../src/response-handlers/common/inline-button-callback'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
import ResponseHandlerFactory from '../../../src/factories/response-handler-factory';

checkNotNullTest(['value', 'user'], (args) => { new InlineButtonCallback(args); });

test('can be constructed with default parameters', t => {
  const cb = new InlineButtonCallback({ value: { foo: 'bar' }, user: {} });
  t.is(cb.type, 'inline-button-callback');
  t.deepEqual(cb.value, { foo: 'bar' });
  t.truthy(cb.user);
});

test.cb('should execute handler on call', t => {
  ResponseHandlerFactory.getHandler = () => { return { call: () => t.end() }; };
  const response = { type: 'empty', userKey: 'cli_1' };
  const user = { state: {} };
  const cb = new InlineButtonCallback({ value: response, user });
  cb.call();
});
