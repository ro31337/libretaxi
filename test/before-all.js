import test from 'ava';
import dns from 'dns';

test.cb('localhost.firebaseio.test should be specified in /etc/hosts', t => {
  t.plan(1);
  dns.lookup('localhost.firebaseio.test', (err, result) => {
    if (!err) {
      t.is(result, '127.0.0.1');
    }
    t.end();
  });
});
