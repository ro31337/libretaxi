import { mix } from 'mixwith';
import checkNotNull from '../../validations/check-not-null';
import IfResponse from '../if-response';
import CompositeResponse from '../composite-response';
import Response from '../response';

/**
 * {@link CompositeResponse} decorator. Used to optimize two responses into one.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @date 2016-11-13
 * @version 1.1
 * @since 0.1.0
 */
export default class CompositeResponseDecorator extends mix(Response).with(checkNotNull('origin')) {
  /**
   * Constructor.
   *
   * @param {CompositeResponse} origin - origin response.
   */
  constructor(options) {
    super(options);
    this.origin = options.origin;
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
