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

import IfResponse from '../if-response';
import CompositeResponse from '../composite-response';
import Response from '../response';

/**
 * {@link CompositeResponse} decorator. Used to optimize two responses into one.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-11-13
 * @version 1.1
 * @since 0.1.0
 */
export default class CompositeResponseDecorator extends Response {
  /**
   * Constructor.
   *
   * @type object
   * @param {CompositeResponse} origin - origin response.
   */
  constructor(origin) {
    super({ type: 'composite' });
    this.origin = origin;
  }

  /**
   * Add response to composite.
   */
  add(...args) {
    this.origin.add(...args);
    this.optimized = undefined;
  }

  /**
   * List of responses.
   */
  get responses() {
    if (!this.optimized) this.optimized = this.traverse(this.origin);
    return this.optimized.responses;
  }

  /**
   * Traverse node without modifying existing nodes. This method builds new node tree if node(s)
   * can be optimized.
   *
   * @protected
   * @param {Response} root - node to traverse
   * @return {Response} node - new or existing node
   */
  traverse(root) {
    if (!root) {
      return undefined;
    } else if (root.type === 'composite') {
      return this.traverseComposite(root);
    } else if (root.type === 'if') {
      return this.traverseIf(root);
    }
    return root;
  }

  /**
   * Traverse composite node
   *
   * @protected
   * @param {CompositeResponse} root - composite node to traverse
   * @return {CompositeResponse} node - new node, optimized if optimization took place
   */
  traverseComposite(root) {
    const response = new CompositeResponse();
    const rr = root.responses;
    for (let i = 0, len = rr.length; i < len; i++) {
      const r1 = rr[i];
      const r2 = rr[i + 1]; // will return undefined when out of boundaries
      if (this.optimize(r1, r2, response)) {
        i++;
      } else {
        response.add(this.traverse(r1));
      }
    }
    // if was optimized, try to optimize one more time
    if (response.responses.length !== rr.length) return this.traverseComposite(response);
    return response;
  }

  /**
   * Optimize response
   *
   * @abstract
   * @protected
   */
  optimize(r1, r2, response) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }

  /**
   * Traverse if-node
   *
   * @protected
   * @param {IfResponse} root - if-node to traverse
   * @return {IfResponse} node - new node, optimized if optimization took place
   */
  traverseIf(root) {
    const ok = this.traverse(root.ok);
    const err = this.traverse(root.err);
    return new IfResponse({ condition: root.condition, ok, err });
  }
}
