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

import InlineOptionsResponse from '../inline-options-response';
import CompositeResponseDecorator from './composite-response-decorator';
import If from '../if-response';

/**
 * {@link CompositeResponse} decorator. Optimize {@link TextResponse} and
 * {@link InlineOptionsResponse} usage by removing the first one from the list of responses and
 * copying the `message` to the second one.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CompositeResponseDecorator}
 * @date 2016-11-24
 * @version 1.1
 * @since 0.1.0
 */
export default class OptimizedInlineOptions extends CompositeResponseDecorator {
  /**
   * Optimize response
   *
   * @override
   */
  optimize(r1, r2, response) {
    if (!(r2 && r1.type === 'text')) return false;

    if (r2.type === 'inline-options' && !r2.message) {
      response.add(new InlineOptionsResponse({ rows: r2.rows, message: r1.message }));
      return true;
    }

    // optimize `if` only if both `ok` and `err` defined (and their `message`s undefined)
    if (r2.type === 'if' &&
      (r2.ok && !r2.ok.message) && (r2.err && !r2.err.message) &&
      r2.ok.type === 'inline-options' && r2.err.type === 'inline-options') {
      response.add(new If({
        condition: r2.condition,
        ok: new InlineOptionsResponse({
          rows: r2.ok.rows,
          message: r1.message,
        }),
        err: new InlineOptionsResponse({
          rows: r2.err.rows,
          message: r1.message,
        }),
      }));
      return true;
    }

    return false;
  }
}
