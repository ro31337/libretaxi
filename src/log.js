import winston from 'winston';
import moment from 'moment';
import Settings from '../settings';

/**
 * Logger, based on [winston](https://github.com/winstonjs/winston).
 * This class configures winston logger by modifying file transport:
 *
 * Output to console starts with `YYYY-MM-DD HH:mm:ss` prefix, and followed by
 * log level. For example: `[2016-05-23 04:35:01] [info] Something`
 * Log level is set to `debug` by default.
 *
 * File transport configures winston to redirect logs into specified file
 * (`LOG_FILE` parameter in `settings.js`). By default winston writes file
 * transport logs in json format, but in this transport format described
 * above is used.
 *
 * @example
 * import log from './log';
 * log.debug('application started');
 *
 * @extends {winston.logger}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-23
 * @see https://github.com/winstonjs/winston
 * @version 1.2
 * @since 0.1.0
 */
class Log extends winston.Logger {
  /**
   * Constructor.
   */
  constructor() {
    const settings = new Settings();
    const fileTransport = new (winston.transports.File)({
      timestamp() {
        return Date.now();
      },
      formatter(options) {
        const date = moment(options.timestamp()).format('YYYY-MM-DD HH:mm:ss');
        const message = options.message || '';

        return `[${date}] [${options.level}] ${message}`; // skip meta information
      },
      filename: settings.LOG_FILE,
      json: false,
    });

    super({
      transports: [fileTransport],
      level: 'debug',
    });
  }
}

/**
 * Stub logger, implements empty {@link Log} interface.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-01
 * @version 1.1
 * @since 0.1.0
 */
class StubLog {
  debug() {}
}

const instance = process.env.TEST_ENVIRONMENT ? new StubLog() : new Log();

export default instance;
