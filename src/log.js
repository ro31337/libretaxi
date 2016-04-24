require('dotenv').config();
import winston from 'winston';
import moment from 'moment';

/**
 * Logger, based on [winston](https://github.com/winstonjs/winston).
 * This class configures winston logger by adding two transports:
 *
 * **1. Console transport:**
 *
 * Output to console starts with `YYYY-MM-DD HH:mm:ss` prefix, and followed by
 * log level. For example: `[2016-05-23 04:35:01] [info] Something`
 * Log level is set to `debug` by default.
 *
 * **2. File transport:**
 *
 * File transport configures winston to redirect logs into specified file
 * (`LOG_FILE` parameter in `.env`). By default winston writes file
 * transport logs in json format.
 *
 * Note: meta information is skipped in console transport and stored in
 * log file only.
 *
 * @example
 * const log = new Log();
 * log.debug('application started');
 *
 * @extends {winston.logger}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-23
 * @see https://github.com/winstonjs/winston
 * @version 1.1
 * @since 0.1.0
 * @return {Object} Instance of logger
 */
export default class Log extends winston.Logger {
  constructor() {
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
      filename: process.env.LOG_FILE,
    });

    super({
      transports: [consoleTransport, fileTransport],
      level: 'debug',
    });
  }
}
