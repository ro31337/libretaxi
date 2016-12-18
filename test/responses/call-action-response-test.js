/* eslint-disable no-new */
import test from 'ava';
import CallActionResponse from '../../src/responses/call-action-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['userKey', 'route'], (args) => { new CallActionResponse(args); });

test('can be constructed with default parameters', t => {
  new CallActionResponse({ userKey: 'cli_1', route: 'default' });
  t.pass();
});

test('can be constructed with optional parameters', t => {
  const r = new CallActionResponse({ userKey: 'cli_1', route: 'default', arg: { foo: 'bar' },
    kicker: {}, delay: 3000 });
  t.is(r.type, 'call-action');
  t.is(r.userKey, 'cli_1');
  t.is(r.route, 'default');
  t.deepEqual(r.arg, { foo: 'bar' });
  t.truthy(r.kicker);
  t.is(r.delay, 3000);
});
