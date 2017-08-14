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

/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import test from 'ava';
import i18n from 'i18n';
import appRoot from 'app-root-path';
import locales from '../src/validations/supported-locales';

const ss = { // stands for spec support
  guidRegex: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
};

test.beforeEach(t => {
  ss.sinon = sinon.sandbox.create();
});

test.afterEach.always(t => {
  ss.sinon.restore();
});

const t = {}; // translations

i18n.configure({
  locales,
  register: t,
  directory: `${appRoot.path}/locales`,
});

t.setLocale('en'); // default locale for tests

export { ss, t as i18n };
