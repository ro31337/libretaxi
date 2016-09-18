/* eslint-disable no-console */
import log from './log';
import './init';
import ActionFactory from './factories/action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';
import UserFactory from './factories/user-factory';
import queue from './queue-facade';

log.debug('Application started');

// Function to handle actions.
// 1. Action is created based on provided `options.route`.
// 2. Action is called, response is received.
// 3. Handler is executed for specific response
// 4. If `once` is false, message is posted to `kue` when handler is finished.

const callAction = (options) => {
  // console.log('Current user state:');
  // console.dir(user.state);
  const user = options.user;
  const route = options.route;

  const action = ActionFactory.fromRoute({ route, user });
  const response = action.call(options.arg);
  const handler = ResponseHandlerFactory.getHandler({ response, user });

  const empty = () => {};
  const postNextMessage = (arg) => {
    const userKey = user.userKey;
    queue.callAction({ userKey, arg, route: user.state.menuLocation });
  };
  const done = options.once ? empty : postNextMessage;
  handler.call(done);
};

// Response handler loop.
// When `call-action` is posted with `queue.create`, it's processed here.

queue.processCallAction((job, done) => {
  const data = job.data;
  UserFactory.fromUserKey(data.userKey).load().then((user) => {
    callAction({
      user,
      arg: data.arg,
      route: data.route,
    });
  })
  .catch((err) => console.log(err))
  .then(() => done()); // = finally. Always call "done" kue callback.
});

// Create and queue initial `call-action`.

UserFactory.fromUserKey('cli_1').load().then((user) => {
  const userKey = user.userKey;
  queue.callAction({ userKey, route: user.state.menuLocation || 'default' });
})
.catch((err) => console.log(err));
