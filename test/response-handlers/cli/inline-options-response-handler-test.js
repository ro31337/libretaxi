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
import InlineOptionsResponseHandler from '../../../src/response-handlers/cli/inline-options-response-handler'; // eslint-disable-line max-len
import InlineOptionsResponse from '../../../src/responses/inline-options-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import hotkeys from '../../../src/cli-hotkeys';
import { ss } from '../../spec-support';
import sinon from 'sinon';

checkNotNullTest('response', (args) => { new InlineOptionsResponseHandler(args); });

const response = new InlineOptionsResponse({
  rows: [
    [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  ],
});

test('can be constructed with default parameters', t => {
  new InlineOptionsResponseHandler({ response: {} });
  t.pass();
});

test.cb('should print the message to console', t => {
  const h = new InlineOptionsResponseHandler({ response, user: {} });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  h.call(() => {
    t.truthy(console.log.calledWith('[One] (^Q), [Two] (^W), [Three] (^E)'));
    console.log = tmp;
    t.end();
  });
});

test.cb('should clear all hotkeys and set hotkeys', t => {
  const h = new InlineOptionsResponseHandler({ response, user: {} });
  const tmp = console.log;
  console.log = ss.sinon.spy();
  hotkeys.clearAll = ss.sinon.spy();
  hotkeys.set = ss.sinon.spy();

  h.call(() => {
    t.truthy(hotkeys.clearAll.calledWith());
    t.truthy(hotkeys.set.calledWith('Q'));
    t.truthy(hotkeys.set.calledWith('W'));
    t.truthy(hotkeys.set.calledWith('E'));
    sinon.assert.callOrder(hotkeys.clearAll, hotkeys.set);
    console.log = tmp;
    t.end();
  });
});

test.cb('should set correct callbacks for hotkeys', t => {
  const h = new InlineOptionsResponseHandler({ response, user: {} });
  const tmp = console.log;
  const hh = {};
  console.log = ss.sinon.spy();
  hotkeys.clearAll = ss.sinon.spy();
  hotkeys.set = (k, v) => { hh[k] = v; };

  h.call(() => {
    t.truthy(hh.Q.type, 'inline-button-callback');
    t.truthy(hh.W.type, 'inline-button-callback');
    t.truthy(hh.E.type, 'inline-button-callback');
    t.is(hh.Q.value, '1');
    t.is(hh.W.value, '2');
    t.is(hh.E.value, '3');
    console.log = tmp;
    t.end();
  });
});
