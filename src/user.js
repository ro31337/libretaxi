import objectAssign from 'object-assign';
import ValidatedUser from './validations/validated-user';
/**
 * User.
 * Represents the user who belongs to specific platform (Telegram, Cli, etc.)
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedUser}
 * @date 2016-04-25
 * @version 1.1
 * @since 0.1.0
 */
export default class User extends ValidatedUser {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.platformType - Platform type identifier,
   * for example: "telegram", or "cli". See {@link SupportedPlatforms}
   * @param {string} options.platformId - User unique id for specified platform.
   */
  constructor(options) {
    super(options);
    objectAssign(this, options);
  }
}
