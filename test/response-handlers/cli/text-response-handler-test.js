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

/* eslint-disable no-new, no-console */
import test from 'ava';
import TextResponseHandler from '../../../src/response-handlers/cli/text-response-handler';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new TextResponseHandler(args); });

test('can be constructed with default parameters', t => {
  new TextResponseHandler({ response: {} });
  t.pass();
});

test.cb('prints the message to console', t => {
  // arrange
  const r = { message: 'foo' };
  const h = new TextResponseHandler({ response: r });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  // act
  h.call(() => {
    // assert
    t.truthy(console.log.calledWith('foo'));
    console.log = tmp;
    t.end();
  });
});
