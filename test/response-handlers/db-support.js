import test from 'ava';
import FirebaseServer from 'firebase-server';

let server = null;

test.before(() => {
  server = new FirebaseServer(5002, 'localhost.firebaseio.test', {
    users: {
      cli_1: { foo: 1, bar: 2 }, // for user-state-response-handler.js
      cli_2: { menuLocation: 'something' }, // for redirect-response-handler.js
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});
