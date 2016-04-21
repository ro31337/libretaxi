import winston from 'winston';
import moment from 'moment';

const consoleTransport = new (winston.transports.Console)({
  timestamp() {
    return Date.now();
  },
  formatter(options) {
    const date = moment(options.timestamp()).format('YYYY-MM-DD HH:mm:ss');
    const message = options.message || '';

    return `[${date}] [${options.level}] ${message}`; // skip meta information
  },
});

const fileTransport = new (winston.transports.File)({
  filename: 'cheaptaxi.log',
});

module.exports = new (winston.Logger)({
  transports: [consoleTransport, fileTransport],
  level: 'debug',
});
