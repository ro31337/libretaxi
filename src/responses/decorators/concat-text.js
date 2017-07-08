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

import TextResponse from '../text-response';
import CompositeResponseDecorator from './composite-response-decorator';

/**
 * {@link CompositeResponse} decorator. Optimize {@link TextResponse} and
 * {@link RequestLocationResponse} usage by removing the first one from the list of responses and
 * copying the `message` to the second one.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CompositeResponseDecorator}
 * @date 2016-11-15
 * @version 1.2
 * @since 0.1.0
 */
export default class ConcatText extends CompositeResponseDecorator {
  /**
   * Optimize response
   *
   * @override
   */
  optimize(r1, r2, response) {
    if (r2 && r1.type === 'text' && r2.type === 'text' && !r1.important && !r2.important) {
      const m1 = r1.message;
      const m2 = r2.message;
      const separator = m1.length > 20 ? '\n' : ' ';
      response.add(new TextResponse({ message: m1 + separator + m2 }));
      return true;
    }
    return false;
  }
}
