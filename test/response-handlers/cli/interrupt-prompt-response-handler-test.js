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
import InterruptPromptResponseHandler from '../../../src/response-handlers/cli/interrupt-prompt-response-handler'; // eslint-disable-line max-len
import { ss } from '../../spec-support';

test('can be constructed with default parameters', t => {
  const h = new InterruptPromptResponseHandler({ response: {} });
  t.is(h.type, 'cli-interrupt-prompt-response-handler');
  t.pass();
});

test('calls interrupt prompt api on call', t => {
  // arrange
  t.plan(1);
  const spy = ss.sinon.spy();
  const h = new InterruptPromptResponseHandler({
    response: {},
    inquirer: {
      interruptPrompt: spy,
    },
  });
  // act
  h.call(31337);
  t.truthy(spy.calledWith(31337));
});
