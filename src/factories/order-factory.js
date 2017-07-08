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

import Order from '../order';

/**
 * @typedef loadOrder
 *
 * Creates concrete `Order` instance based on `orderKey`.
 *
 * @param {string} orderKey - order key
 * @return {Promise} promise - promise that resolves with `order` when order data loaded.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-04
 * @version 1.1
 * @since 0.1.0
 */
let loadOrder = (orderKey) => { // eslint-disable-line import/no-mutable-exports, arrow-body-style
  return new Order({ orderKey }).load();
};

/**
 * @typedef mockLoadOrder
 *
 * Mock `loadOrder` method. Useful for tests.
 *
 * @param {function} mock - new `loadOrder` method
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-04
 * @version 1.1
 * @since 0.1.0
 */
const mockLoadOrder = (mock) => {
  loadOrder = mock;
};

export { loadOrder, mockLoadOrder };
