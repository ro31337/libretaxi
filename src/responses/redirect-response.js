import Response from './response';
import objectAssign from 'object-assign';
import { ArgumentError } from '../validations/errors';

/**
 * Redirect response.
 * Response is used to redirect the user to new menu location. Is a subtype
 * of {@link Response} with type 'redirect' (see {@link SupportedResponseTypes}).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-10
 * @version 1.1
 * @since 0.1.0
 */
export default class RedirectResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.path - Absolute or relative path, see example.
   * `path` must starts with `./`, `../` or `/0.1.0/` and ends with `.js`.
   *
   * OK - ./foo.js
   * OK - ../foo.js
   * OK - ../foo/bar/something.js
   * OK - /0.1.0/foo.js
   * OK - /0.1.0/dir/foo.js
   * OK - /1.2.3/dir/foo.js
   * OK - /1.2.3/dir/foo-bar.js
   *
   * ERR - ../foo
   * ERR - /0.1.0/foo
   * ERR - /foo/bar/something.js
   * ERR - foo/bar/
   * ERR - xxx/0.1.0/dir/foo.js
   *
   * @throws {ArgumentError} thrown when path invalid or not specified.
   * @see http://refiddle.com/refiddles/573269f675622d0ba11c0600
   * @example
   * return new RedirectResponse('./another-action.js'); // redirects to sibling
   * or
   * return new RedirectResponse('../category/some-action.js'); // to category
   * or
   * return new RedirectResponse('/0.1.0/absolute/path.js'); // to absolute path
   */
  constructor(options) {
    const opts = objectAssign({ type: 'redirect' }, options);
    super(opts);

    if (!opts.path) {
      throw new ArgumentError('path parameter not specified');
    }

    const validated = /^((\/\d\.\d\.\d\/)|(\.{1,2}))[\w\-\./]+\.js$/.test(opts.path);

    if (!validated) {
      throw new ArgumentError('path format invalid');
    }

    objectAssign(this, opts);
  }
}
