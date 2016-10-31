import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { loadUser } from './factories/user-factory';

dotenv.config();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
console.log('OK telegram bot is waiting for messages...');

bot.on('message', (msg) => {

  const userKey = `telegram_${msg.chat.id}`;
  const text = msg.text;
  console.log(`Got '${text}' from ${userKey}`);

  loadUser(userKey).then((user) => {
    bot.sendMessage(user.platformId, '👌 OK!');
  });
});
