import test from 'ava';

test('app', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});
