/* eslint-disable no-console */
import log from './log';
import './init';
import ActionFactory from './factories/action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';
import { loadUser } from './factories/user-factory';
import CliCaQueue from './queue/cli-ca-queue';

log.debug('Application started');

// Create and queue initial `call-action`.

if (process.argv.length !== 3) {
  console.log('Usage: npm start user_key');
  console.log('Example: npm start cli_1');
  process.exit();
}

const instanceUserKey = process.argv[2];
const queue = new CliCaQueue({ userKey: instanceUserKey });

loadUser(instanceUserKey).then((user) => {
  const userKey = user.userKey;
  queue.create({ userKey, route: user.state.menuLocation || 'default' });
})
.catch((err) => console.log(err));

// Function to handle actions.
// 1. Action is created based on provided `options.route`.
// 2. Action is called, response is received.
// 3. Handler is executed for specific response
// 4. If `once` is false, message is posted to `kue` when handler is finished.

const callAction = (options) => {
  // console.dir(options);
  // console.log('Current user state:');
  // console.dir(user.state);
  const user = options.user;
  const route = options.route || 'default';

  const action = ActionFactory.fromRoute({ route, user });
  const response = action.call(options.arg);
  const handler = ResponseHandlerFactory.getHandler({ response, user });

  const empty = () => {};
  const postNextMessage = (arg) => {
    const userKey = user.userKey;
    queue.create({ userKey, arg, route: user.state.menuLocation });
  };
  const done = options.once ? empty : postNextMessage;
  handler.call(done);
};

// Response handler loop.
// When `call-action` is posted with `queue.create`, it's processed here.

queue.process((job, done) => {
  const data = job.data;
  loadUser(data.userKey).then((user) => {
    callAction({
      user,
      arg: data.arg,
      route: data.route,
    });
  })
  .catch((err) => console.log(err))
  .then(() => done()); // = finally. Always call "done" kue callback.
});
