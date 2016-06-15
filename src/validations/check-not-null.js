import { Mixin } from 'mixwith';
import { ArgumentError } from './errors';

/**
 * @typedef checkNotNull
 *
 * Validation mixin for null or empty constructor parameters.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-12
 * @version 1.1
 * @since 0.1.0
 * @param {string|Array} props - string or list of string to check for null
 * @throws {ArgumentError} throw argument error when parameter(s) null
 * @example
 * import checkNotNull from './check-not-null.js';
 * class Foo extends mix(class {}).with(checkNotNull('bar')) {
 *   constructor(options) { super(options); }
 * }
 * @example
 * import checkNotNull from './check-not-null.js';
 * class Foo extends mix(class {}).with(checkNotNull(['bar', 'buz'])) {
 *   constructor(options) { super(options); }
 * }
 */
module.exports = (props) => { // eslint-disable-line arrow-body-style
  return Mixin((s) => class extends s { // eslint-disable-line
    constructor(options) {
      super(options);

      if (!options) {
        throw new ArgumentError('parameters not specified');
      }

      const validate = (prop) => {
        if (!options[prop]) {
          throw new ArgumentError(`'${prop}' parameter not specified`);
        }
      };

      if (props instanceof Array) {
        for (let i = 0; i < props.length; i++) {
          validate(props[i]);
        }
      } else {
        validate(props);
      }
    }
  });
};
