require('dotenv').config({ path: '../.env-sample' });
import test from 'ava';

test('sample config should have telegram token key specified', t => {
  t.is(process.env.TELEGRAM_TOKEN, '');
});

test('sample config should not have TEST_ENVIRONMENT', t => {
  t.falsy(process.env.TEST_ENVIRONMENT);
});
