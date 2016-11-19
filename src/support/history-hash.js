/**
 * Naive implementation of LRU-like cache. This class allows to keep up to `capacity` number
 * of items in hash. Older items are removed from hash. "Older item" is item that has not
 * been pushed recently.
 *
 * Note: this implementation is not efficient for keeping big number of key-value pairs.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-18
 * @version 1.1
 * @since 0.1.0
 * @example
 * const hh = new HistoryHash({
 *   capacity: 3,
 *   history: ['foo', 'bar'],
 *   hash: {
 *     bar: 'barValue',
 *     foo: 'fooValue',
 *   },
 * });
 * const hh2 = hh.merge({ x: 11, y: 22 });
 * console.dir(hh2);
 * // Result ('foo' is removed):
 * // HistoryHash {
 * //   history: [ 'bar', 'x', 'y' ],
 * //   hash: { bar: 'barValue', x: 11, y: 22 },
 * //   capacity: 3 }
 */
export default class HistoryHash {

  /**
   * Constructor.
   *
   * @param {HistoryHash|Object} obj - (optional) existing history hash.
   */
  constructor(obj) {
    Object.assign(this, obj);
    this.capacity = this.capacity || 30;
    this.history = this.history || [];
    this.hash = this.hash || {};
  }

  /**
   * Merge hash values with existing values and remove oldest.
   *
   * @param {Object} obj - new hash values. Can contain 1 or more values.
   * @return {HistoryHash} - new instance of HistoryHash. Existing instance remains
   * unmutable.
   */
  merge(obj) {
    const kk = Object.keys(obj);
    if (kk.length === 0) return undefined;
    if (kk.length > this.capacity) {
      throw new Error("Can't push with this amount of keys (over capacity)");
    }

    // clone history and hash so existing objects will remain immutable
    let history = this.history.slice();
    const hash = Object.assign({}, this.hash);

    for (const k of kk) {
      // remove oldest
      if (Object.keys(hash).length >= this.capacity && !hash[k]) {
        const oldest = history.shift();
        delete hash[oldest];
      }
      // remove current from array if exists
      history = history.filter(item => item !== k);
      // add current
      history.push(k);
      hash[k] = obj[k];
    }

    return new HistoryHash({ history, hash });
  }
}
