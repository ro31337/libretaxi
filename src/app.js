import Log from './log';
import './init';
import ActionFactory from './action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';
import UserFactory from './factories/user-factory';
import kue from 'kue';

const queue = kue.createQueue();
const log = new Log();
log.debug(__('app.welcome_banner'));

// Function to handle menu actions.
// 1. Action is created based on user location.
// 2. Action is called, response is received.
// 3. Handler is executed for specific response.

const callMenuAction = (user, arg) => {
  // console.log('Current user state:');
  // console.dir(user.state);

  const action = ActionFactory.fromMenuLocation(user);
  const response = action.call(arg);
  const handler = ResponseHandlerFactory.getHandler({ response, user });

  handler.call((retVal) => {
    queue.create('response', { userKey: user.userKey, arg: retVal })
      .priority('high')
      .save();
  });
};

// Response handler loop.
// When message `response` is posted with `queue.create`, it's processed here.

queue.process('response', (job, done) => {
  const d = job.data;
  UserFactory.fromUserKey(d.userKey).load().then((user) => {
    callMenuAction(user, d.arg);
  })
  .catch((err) => console.log(err)) // eslint-disable-line no-console
  .then(() => done()); // = finally. Always call "done" kue callback.
});

// Create and queue initial response.

queue.create('response', { userKey: 'cli_1' })
  .priority('high')
  .save();
