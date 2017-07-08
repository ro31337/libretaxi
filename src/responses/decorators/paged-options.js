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

import Response from '../response';

/**
 * {@link OptionsResponse} paged decorator. Decorates options response so it acts like a single
 * page with next/previous buttons (if applicable). Accepts any configuration of buttons and rows,
 * like 2 per row, 3 per row, etc.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2017-02-15
 * @version 1.1
 * @since 0.1.0
 */
export default class PagedOptions extends Response {
  /**
   * Constructor.
   *
   * @type object
   * @param {Number|String} currentPage - numeric page number (can be undefined, defaults to 1).
   * @param {CompositeResponse} origin - origin response.
   */
  constructor(currentPage, origin) {
    super({ type: 'options' });
    this.origin = origin;
    this.currentPage = Math.min(
      this.totalPages,
      Math.ceil(Math.abs(((currentPage * 1) || 1))) * 1 // coerce anything to a page number
    );
  }

  /**
   * List of paged rows, returns 6 buttons max (2 columns, 3 rows). If paged, contains next and/or
   * previous buttons (with 'next' and 'previous' values).
   * @see https://github.com/ro31337/libretaxi/issues/504
   */
  get rows() {
    if (this.page) return this.page;

    const rows = [[]];
    let cursor = 0;
    let maxItemsOnPage = 6;
    let next = false;
    let previous = false;
    const { currentPage, totalPages } = this;

    // update cursor position
    if (currentPage !== 1) {
      cursor = 4 * (currentPage - 1) + 1;
    }

    // update items per page and next/previous buttons visibility
    if (totalPages > 1) {
      const isLast = currentPage === totalPages;
      const isFirst = currentPage === 1;
      const isMiddle = currentPage > 1 && currentPage < totalPages;

      next = isFirst || isMiddle;
      previous = isLast || isMiddle;
      maxItemsOnPage = (isFirst || isLast) ? 5 : 4;
    }

    // returns last row (and adds new one if there is no room)
    const getRow = () => {
      const last = () => rows[rows.length - 1];
      if (last().length > 1) { rows.push([]); }
      return last();
    };

    // build rows array with 2 buttons for each row
    this.traverse((button) => {
      if (cursor > 0) { cursor--; return; }
      if (maxItemsOnPage === 0) return;
      getRow().push(button);
      maxItemsOnPage--;
    });

    // add next and previous buttons
    if (next || previous) {
      const row = getRow();
      if (previous) { row.unshift({ label: '← ...', value: 'previous' }); }
      if (next) { row.push({ label: '... →', value: 'next' }); }
    }

    this.page = rows;
    return rows;
  }

  /**
   * Fall back to origin message
   */
  get message() {
    return this.origin.message;
  }

  /**
   * Fall back to origin defaultMessage
   */
  get defaultMessage() {
    return this.origin.defaultMessage;
  }

  /**
   * Total number of pages for this response
   */
  get totalPages() {
    const { totalItems } = this;
    if (totalItems <= 6) { return 1; }
    return Math.floor((totalItems + 1) / 4);
  }

  /**
   * Return next or previous page number by provided value (`next` or `previous`)
   *
   * @param {string} value - `next` or `previous`
   * @return {number} next or previous page number
   */
  nextPageNumber(value) {
    let n = this.currentPage;
    const { totalPages } = this;
    if (value === 'next') { n += 1; }
    if (value === 'previous') { n -= 1; }
    if (n < 1) { n = 1; }
    if (n > totalPages) { n = totalPages; }
    return n;
  }

  /**
   * Total number of buttons for this response (wihout next and previous)
   * @private
   */
  get totalItems() {
    if (!this.origin) return 0;
    if (!this.origin.rows) return 0;
    let n = 0;
    this.traverse(() => n++);
    return n;
  }

  /**
   * Traverse each button in each row
   * @private
   */
  traverse(onButton) {
    for (const row of this.origin.rows) {
      for (const button of row) {
        onButton(button);
      }
    }
  }
}
