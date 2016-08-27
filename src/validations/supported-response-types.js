/**
 * @typedef SupportedResponseTypes
 * @desc Hash set that represents the list of currently supported {@link Action}
 * resonse types:
 * - text
 * @extends {Set}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-02
 * @version 1.1
 * @since 0.1.0
 * @example
 * import SupportedResponseTypes from './supported-response-types';
 * if (!SupportedResponseTypes.has('something')) {
 *   console.log('response with type "something" is not supported');
 * }
 */
export default new Set([
  'text',
  'redirect',
  'options',
  'error',
  'user-state',
  'composite',
  'request-phone',
  'request-location',
  'update-location',
  'request-user-input',
  'submit-order',
  'empty',
]);
