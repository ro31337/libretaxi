import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
console.log('OK telegram bot is waiting for messages...');

bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(`Got '${text}' from ${chatId}`);

  bot.sendMessage(chatId, '👌 OK!');
});
