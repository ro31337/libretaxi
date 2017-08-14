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

import test from 'ava';
import EmptyResponseHandler from '../../src/response-handlers/empty-response-handler';
import { ss } from '../spec-support';

test('can be constructed with default parameters', t => {
  const h = new EmptyResponseHandler({ response: {} });
  t.is(h.type, 'empty-response-handler');
  t.pass();
});

test('can be called without callback function', t => {
  const h = new EmptyResponseHandler({ response: {} });
  h.call();
  t.pass();
});

test('should not execute callback even if it\'s provided', t => {
  const h = new EmptyResponseHandler({ response: {} });
  const onResult = ss.sinon.spy();
  h.call(onResult);
  t.is(onResult.called, false);
  t.pass();
});
