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
import { mix } from 'mixwith';
import Mixin from '../../src/validations/validated-options-response';

class ValidatedOptionsResponse extends mix(class {}).with(Mixin) {}

test.cb('should throw type error when rows is not array', t => {
  const err = 'rows parameter is expected to be an array';

  t.throws(() => {
    new ValidatedOptionsResponse({
      rows: 'something',
    });
  }, err);

  t.end();
});

test.cb('should throw type error when row is not array', t => {
  const err = 'row is expected to be an array';

  t.throws(() => {
    new ValidatedOptionsResponse({
      rows: [
        [{ label: 'Ok', value: 'ok' }], // array, OK
        {}, // not array, ERR
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw type error when row item is not object', t => {
  const err = 'row item is expected to be an object';

  t.throws(() => {
    new ValidatedOptionsResponse({
      rows: [
        [
          { label: 'Ok', value: 'ok' }, // object, OK
          'something else', // not object, ERR
        ],
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw argument error when row item has no value property', t => {
  const err = 'row item is expected to have \'value\' property';

  t.throws(() => {
    new ValidatedOptionsResponse({
      rows: [
        [
          { label: 'Ok' }, // no `value` property
        ],
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw argument error when row item has no label property', t => {
  const err = 'row item is expected to have \'label\' property';

  t.throws(() => {
    new ValidatedOptionsResponse({
      rows: [
        [
          { value: 'ok' }, // no `label` property
        ],
      ],
    });
  }, err);

  t.end();
});
