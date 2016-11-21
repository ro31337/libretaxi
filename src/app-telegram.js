/* eslint-disable no-console, no-use-before-define */
import './init';
import TelegramBot from 'tgfancy';
import { loadUser } from './factories/user-factory';
import CaQueue from './queue/ca-queue';
import callAction from './call-action';
import textToValue from './support/text-to-value';
import InlineButtonCallback from './response-handlers/common/inline-button-callback';

const api = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
  tgfancy: { orderedSending: true },
});
console.log('OK telegram bot is waiting for messages...');
const queue = new CaQueue();

api.on('message', (msg) => {
  const userKey = `telegram_${msg.chat.id}`;
  const something = msg.text || (msg.contact || {}).phone_number || getLocation(msg);
  console.log(`Got '${something}' from ${userKey}`);

  loadUser(userKey).then((user) => {
    queue.create({
      userKey,
      arg: msg.text ? textToValue(user, msg.text) : something,
      route: user.state.menuLocation || 'default',
    });
  });
});

api.on('callback_query', (msg) => {
  const userKey = `telegram_${msg.from.id}`;
  const data = msg.data;
  console.log(`Got inline button value ${data} from ${userKey}`);

  loadUser(userKey).then((user) => {
    new InlineButtonCallback({ user, value: data, api }).call();
  });

  api.editMessageText('✔️ You replied to this order', {
    chat_id: msg.message.chat.id,
    message_id: msg.message.message_id,
  });
});

queue.process((job, done) => {
  const data = job.data;
  loadUser(data.userKey).then((user) => {
    callAction({
      user,
      arg: data.arg,
      route: data.route,
      queue,
      api,
    });
  })
  .catch((err) => console.log(err))
  .then(() => done());
});

const getLocation = (msg) => {
  if (!msg.location) return undefined;
  return [msg.location.latitude, msg.location.longitude];
};
