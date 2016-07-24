import Log from './log';
import './init';
import User from './user';
import ActionFactory from './action-factory';
import ResponseHandlerFactory from './factories/response-handler-factory';

const log = new Log();
log.debug(__('app.welcome_banner'));

new User({ platformType: 'cli', platformId: '1' }).load().then((user) => {
  const f = (arg) => {
    // console.log('Current user state:');
    // console.dir(user.state);

    const action = ActionFactory.fromMenuLocation(user);
    const response = action.call(arg);
    const handler = ResponseHandlerFactory.getHandler({ response, user });

    handler.call((value) => {
      f(value);
    });
  };
  f();
})
.catch((err) => {
  console.dir(err); // eslint-disable-line no-console
});
