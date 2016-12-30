import ActionFactory from './factories/action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';
import log from './log';

// Function to handle actions.
// 1. Action is created based on provided `options.route`.
// 2. Action is called, response is received.
// 3. Handler is executed for specific response
// 4. If `once` is false, message is posted to `kue` when handler is finished.

export default (options) => { // eslint-disable-line
  // console.dir(options);
  // console.log('Current user state:');
  // console.dir(options.user.state);
  const user = options.user;
  const route = options.route || 'default';
  const queue = options.queue;

  const action = ActionFactory.fromRoute({ route, user });
  log.debug(`calling ${action.type} with ${options.arg}`);
  log.debug(options.arg);
  const response = action.call(options.arg);
  const handler = ResponseHandlerFactory.getHandler({ response, user, api: options.api });

  const postNextMessage = (arg) => {
    const userKey = user.userKey;
    queue.create({ userKey, arg, route: user.state.menuLocation });
  };
  handler.call(postNextMessage);
};
