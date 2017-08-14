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

/* eslint-disable no-new */
import test from 'ava';
import ResponseHandler from '../../src/response-handlers/response-handler';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest('response', (args) => { new ResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new ResponseHandler({ response: {}, type: 'bar' });
  t.pass();
});

test('should set properties', t => {
  const r = new ResponseHandler({ response: {}, type: 'bar', user: 'user', api: 'api' });
  t.is(r.api, 'api');
  t.is(r.user, 'user');
  t.is(r.type, 'bar');
});

test('should save response', t => {
  const r = { message: 'foo' };
  const h = new ResponseHandler({ response: r, type: 'bar' });
  t.is(h.response.message, 'foo');
});

test.cb('abstract class, should throw error on call', t => {
  const err = 'not implemented';
  const h = new ResponseHandler({ response: {}, type: 'bar' });

  t.throws(() => { h.call(); }, err);

  t.end();
});
