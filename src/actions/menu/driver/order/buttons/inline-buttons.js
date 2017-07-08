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

import sendMyNumber from './send-my-number';
import setMyPrice from './set-my-price';
import uuid from 'uuid';

/**
 * @typedef inlineButtons
 *
 * Unline buttons factory method that returns 3 buttons and their guids.
 *
 * @param {object} args - hash of parameters for buttons
 * @param {User} driver - driver instance
 * @return {Response} response - response expression
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-19
 * @version 1.2
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return {
    setMyPrice: {
      response: setMyPrice(args, driver),
      guid: uuid.v4(),
    },
    sendMyNumber: {
      response: sendMyNumber(args, driver),
      guid: uuid.v4(),
    },
  };
};
