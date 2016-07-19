/* eslint-disable no-new */
import test from 'ava';
import UserStateResponseHandler from '../../src/response-handlers/user-state-response-handler';
import UserStateResponse from '../../src/responses/user-state-response';
import RedirectResponseHandler from '../../src/response-handlers/redirect-response-handler';
import RedirectResponse from '../../src/responses/redirect-response';
import checkNotNullTest from '../helpers/check-not-null.js';
import User from '../../src/user';
import dbSupport from './db-support'; // eslint-disable-line no-unused-vars

/*
 *
 * For some reason line
 *
 * import dbSupport from './db-support';
 *
 * called more than 1 time for more than 1 file where it is
 * mentioned. It leads to port 5002 binding error. So in this
 * file we have tests for:
 *
 * 1. UserStateResponseHandler
 * 2. RedirectResponseHandler
 *
 * This issue must be fixed.
 *
 */

/*
 * 1. UserStateResponseHandler
 */

checkNotNullTest(['response', 'user'], (args) => { new UserStateResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new UserStateResponseHandler({ response: {}, user: {} });
  t.pass();
});

test.cb('updates user object', t => {
  t.plan(4);

  new User({ platformType: 'cli', platformId: 1 }).load().then((user) => {
    t.is(user.state.foo, 1);
    t.is(user.state.bar, 2);

    const response = new UserStateResponse({ foo: 123 });
    const handler = new UserStateResponseHandler({ response, user });

    handler.call(() => {
      t.is(user.state.foo, 123);
      t.is(user.state.bar, 2);
      t.end();
    });
  });
});

/*
 * 2. RedirectResponseHandler
 */

checkNotNullTest(['response', 'user'], (args) => { new RedirectResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new RedirectResponseHandler({ response: {}, user: {} });
  t.pass();
});

test.cb('updates user object', t => {
  t.plan(2);

  new User({ platformType: 'cli', platformId: 2 }).load().then((user) => {
    t.is(user.state.menuLocation, 'something');

    const response = new RedirectResponse({ path: 'default' });
    const handler = new RedirectResponseHandler({ response, user });

    handler.call(() => {
      t.is(user.state.menuLocation, 'default');
      t.end();
    });
  });
});
