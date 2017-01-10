/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import test from 'ava';
import i18n from 'i18n';
import appRoot from 'app-root-path';

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
  locales: ['en', 'ru', 'id'],
  register: t,
  directory: `${appRoot.path}/locales`,
});

t.setLocale('en'); // default locale for tests

export { ss, t as i18n };
