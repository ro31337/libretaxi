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

/**
 * @typedef SupportedPlatforms
 * @desc Hash set that represents the list of currently supported platforms:
 * - telegram
 * - cli
 * @extends {Set}
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-27
 * @version 1.1
 * @since 0.1.0
 * @example
 * import SupportedPlatforms from './supported-platforms';
 * if (!SupportedPlatforms.has('whatsapp')) {
 *   console.log('platform "whatsapp" is not supported');
 * }
 */
export default new Set(['telegram', 'cli']);
