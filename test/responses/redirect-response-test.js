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
import RedirectResponse from '../../src/responses/redirect-response';

test('can be constructed with default parameters', t => {
  new RedirectResponse({ path: 'default' });
  t.pass();
});

test('should save path as property and have redirect type', t => {
  const r = new RedirectResponse({ path: 'default' });
  t.is(r.path, 'default');
  t.is(r.type, 'redirect');
});

test.cb('should throw argument error when path not specified', t => {
  const err = 'path parameter not specified';

  t.throws(() => {
    new RedirectResponse();
  }, err);

  t.end();
});

test.cb('should throw argument error when path not found', t => {
  const err = 'path not found';

  const valid = ['default',
    'select-locale',
  ];

  const invalid = [
    '!invalid!',
  ];

  // should be OK:

  for (let i = 0, len = valid.length; i < len; i++) {
    new RedirectResponse({ path: valid[i] });
  }

  // should NOT be OK:

  for (let i = 0, len = invalid.length; i < len; i++) {
    t.throws(() => {
      new RedirectResponse({ path: invalid[i] });
    }, err);
  }

  t.end();
});
