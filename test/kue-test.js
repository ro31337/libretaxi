import test from 'ava';
import kue from 'kue';

test.cb('should support delayed messages with kue library', t => {
  const queue = kue.createQueue();
  const milliseconds = 500;
  t.plan(1);

  // add handler
  queue.process('test', (job, done) => {
    t.is(job.data.foo, 'bar');
    done();
    t.end();
  });

  // then create with delay
  queue.create('test', { foo: 'bar' })
    .delay(milliseconds)
    .priority('high')
    .save();
});
