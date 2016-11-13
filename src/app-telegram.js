/* eslint-disable no-console */
import './init';
import TelegramBot from 'tgfancy';
import { loadUser } from './factories/user-factory';
import CaQueue from './queue/ca-queue';
import callAction from './call-action';
import textToValue from './support/text-to-value';

const api = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
  tgfancy: { orderedSending: true },
});
console.log('OK telegram bot is waiting for messages...');
const queue = new CaQueue();

api.on('message', (msg) => {
  const userKey = `telegram_${msg.chat.id}`;
  const something = msg.text || (msg.contact || {}).phone_number;
  console.log(`Got '${something}' from ${userKey}`);

  loadUser(userKey).then((user) => {
    queue.create({
      userKey,
      arg: msg.text ? textToValue(user, msg.text) : something,
      route: user.state.menuLocation || 'default',
    });
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
