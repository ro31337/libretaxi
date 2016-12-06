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
