/* eslint-disable no-console */
import './init';
import { loadUser } from './factories/user-factory';
import CliCaQueue from './queue/cli-ca-queue';
import callAction from './call-action';

if (process.argv.length !== 3) {
  console.log('Usage: npm start user_key');
  console.log('Example: npm start cli_1');
  process.exit();
}

const userKey = process.argv[2]; // instance user key
const queue = new CliCaQueue({ userKey });

loadUser(userKey).then((user) => {
  queue.create({ userKey, route: user.state.menuLocation || 'default' });
});

queue.process((job, done) => {
  const data = job.data;
  loadUser(data.userKey).then((user) => {
    callAction({
      user,
      arg: data.arg,
      route: data.route,
      queue,
    });
  })
  .catch((err) => console.log(err))
  .then(() => done());
});
