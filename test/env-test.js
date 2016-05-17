require('dotenv').config();
import test from 'ava';

test('line 1 should load variables from .env in "test" (current) directory', t => {
  t.truthy(process.env.TEST_ENVIRONMENT);
});
