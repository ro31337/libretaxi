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

import kue from 'kue';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Base queue class. Implements facade-ish methods around `kue` library.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-28
 * @version 1.2
 * @extends checkNotNull
 * @abstract
 * @since 0.1.0
 */
export default class Queue extends mix(class {}).with(checkNotNull('type')) {

  /**
   * Constructor.
   *
   * @param {string} options.type - type of queue.
   */
  constructor(options) {
    super(options);
    this.type = options.type;
    this.queue = options.queue || kue.createQueue();
  }

  /**
   * Creates a message and enqueues.
   *
   * @param {Object} options - hash of parameters
   */
  create(options) {
    this.queue
      .create(this.type, options)
      .removeOnComplete(true)
      .save();
  }

  /**
   * Creates a message and enqueues with 1 second delay by default.
   *
   * @param {Object} options - hash of parameters
   * @param {Number} delay - (optional) delay in msec, 1000 msec by default.
   */
  createDelayed(options, delay = 1000) {
    this.queue
      .create(this.type, options)
      .delay(delay)
      .removeOnComplete(true)
      .save();
  }

  /**
   * Sets a callback to process messages.
   *
   * @param {Function} callback - function to be executed for each queue message.
   */
  process(callback) {
    this.queue
      .process(this.type, 20, callback);
  }
}
