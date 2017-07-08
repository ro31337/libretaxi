/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
