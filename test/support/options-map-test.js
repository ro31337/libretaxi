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
import OptionsMap from '../../src/support/options-map';
import OptionsResponse from '../../src/responses/options-response';
import CompositeResponse from '../../src/responses/composite-response';
import TextResponse from '../../src/responses/text-response';
import If from '../../src/responses/if-response';
import checkNotNullTest from '../helpers/check-not-null';

checkNotNullTest('response', (args) => { new OptionsMap(args); });

test('can be constructed with default parameters', t => {
  new OptionsMap({ response: {} });
  t.pass();
});

test('should parse simple options response', t => {
  const response = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ],
  ] });
  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 3);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
});

test('should parse options response with multiple rows and columns', t => {
  const response = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
    ],
    [
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ],
  ] });
  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 3);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
});

test('should parse nested composite response with mixed responses', t => {
  const response1 = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
    ],
  ] });
  const response2 = new TextResponse({ message: 'foo' });
  const response3 = new OptionsResponse({ rows:
  [
    [
      { label: 'three', value: '3' },
      { label: 'four', value: '4' },
    ],
  ] });

  const cr1 = new CompositeResponse()
    .add(response1)
    .add(response2);
  const cr2 = new CompositeResponse()
    .add(response3);
  const response = new CompositeResponse()
    .add(cr1)
    .add(cr2);

  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 4);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
  t.is(map.four, '4');
});

test('should support if response', t => {
  const response1 = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
    ],
  ] });
  const response2 = new OptionsResponse({ rows:
  [
    [
      { label: 'three', value: '3' },
      { label: 'four', value: '4' },
    ],
  ] });
  const response = new If({
    condition: {},
    ok: response1,
    err: response2,
  });

  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 4);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
  t.is(map.four, '4');
});
