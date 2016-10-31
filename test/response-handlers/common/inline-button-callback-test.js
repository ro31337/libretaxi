/* eslint-disable no-new, no-console, arrow-body-style */
import test from 'ava';
import InlineButtonCallback from '../../../src/response-handlers/common/inline-button-callback'; // eslint-disable-line max-len
import checkNotNullTest from '../../helpers/check-not-null.js';
import { mockLoadUser } from '../../../src/factories/user-factory';
import ResponseHandlerFactory from '../../../src/factories/response-handler-factory';

checkNotNullTest('value', (args) => { new InlineButtonCallback(args); });

test('can be constructed with default parameters', t => {
  const cb = new InlineButtonCallback({ value: JSON.stringify({ foo: 'bar' }) });
  t.is(cb.type, 'inline-button-callback');
  t.is(cb.value, '{"foo":"bar"}');
});

test.cb('should execute handler on call', t => {
  t.plan(1);

  const then = (f) => {
    t.truthy(f);
    f({}); // provide empty user as argument
  };

  mockLoadUser(() => { return { then }; });

  // stub ResponseHandlerFactory
  ResponseHandlerFactory.getHandler = () => { return { call: () => t.end() }; };

  const response = { type: 'empty', userKey: 'cli_1' };
  const cb = new InlineButtonCallback({ value: JSON.stringify(response) });
  cb.call();
});
