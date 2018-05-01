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
import OptionsResponseHandler from '../../../src/response-handlers/cli/options-response-handler';
import OptionsResponse from '../../../src/responses/options-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new OptionsResponseHandler(args); });

const responseObject = new OptionsResponse({
  rows: [
    [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Three', value: '3' }], // eslint-disable-line max-len
    [{ label: 'OK', value: 'ok' }, { label: 'Cancel', value: 'cancel' }],
  ],
});

test('can be constructed with default parameters', t => {
  new OptionsResponseHandler({ response: {} });
  t.pass();
});

test.cb('calls inquirer library with correct parameters', t => {
  // arrange
  const lib = {
    prompt: ss.sinon.stub().returns(
        new Promise((resolve) => {
          resolve({ value: 123 });
        })
      ),
  };
  const h = new OptionsResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (resultValue) => {
    t.is(resultValue, 123);
    t.truthy(lib.prompt.calledWith([
      {
        type: 'list',
        name: 'value',
        message: 'Your choice?',
        choices: [
          { name: 'One', value: '1' },
          { name: 'Two', value: '2' },
          { name: 'Three', value: '3' },
          { name: 'OK', value: 'ok' },
          { name: 'Cancel', value: 'cancel' },
        ],
      },
    ]));
    t.end();
  };

  // act
  h.call(assert);
});

test.cb('handles error while using inquirer library', t => {
  // arrange
  const err = 'Sample error';
  const lib = {
    prompt: () => new Promise((resolve, reject) => { reject(err); }),
  };
  const h = new OptionsResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (actualMessage) => {
    const expectedMessage = `Error in OptionsResponseHandler: ${err}`;
    t.is(actualMessage, expectedMessage);
    t.end();

    // cleanup
    console.log = tmp; // eslint-disable-line no-use-before-define
  };

  const tmp = console.log;
  console.log = assert;

  // act
  h.call(() => {});
});
