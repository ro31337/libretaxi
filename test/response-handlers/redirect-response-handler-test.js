/* eslint-disable no-new */
import test from 'ava';
import RedirectResponseHandler from '../../src/response-handlers/redirect-response-handler';
import RedirectResponse from '../../src/responses/redirect-response';
import checkNotNullTest from '../helpers/check-not-null.js';
import User from '../../src/user';
import FirebaseServer from 'firebase-server';
import { overrideSettings } from '../../src/firebase-db';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5501',
  STATEFUL_CREDENTIALS_FILE: undefined,
});

let server = null;

test.before(() => {
  server = new FirebaseServer(5501, 'localhost.firebaseio.test', {
    users: {
      cli_2: { menuLocation: 'something' },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

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
