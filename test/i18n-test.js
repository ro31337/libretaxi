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

import test from 'ava';
import walk from 'walk';
import oboe from 'oboe';
import fs from 'fs';

const NUM_OF_LOCALIZATIONS = 26;

test.cb('locales should have all keys from en.json, except *_desc', t => {
  t.plan(NUM_OF_LOCALIZATIONS - 1);

  const walker = walk.walk('../locales', { followLinks: false });
  const en = require('../locales/en.json'); // eslint-disable-line global-require

  // walk through each file, except en.json
  walker.on('file', (root, stat, next) => {
    if (stat.name !== 'en.json') {
      const path = `${root}/${stat.name}`;
      const xx = require(path); // eslint-disable-line global-require

      for (const key of Object.keys(xx)) {
        if (xx[key].length === 0) t.fail(`Value length for key '${key}' in ${stat.name} is 0`);
        if (!en[key]) t.fail(`Key '${key}' from '${stat.name}' was not found in en.json`);
      }

      for (const key of Object.keys(en)) {
        if (key.endsWith('_desc')) continue;
        if (!xx[key]) t.fail(`Key '${key}' exists in en.json, but not in ${stat.name}`);
      }

      t.pass();
    }

    next();
  });

  walker.on('end', () => {
    t.end();
  });
});

test('en.json should have corresponding *_desc keys', t => {
  const en = require('../locales/en.json'); // eslint-disable-line global-require

  for (const key of Object.keys(en)) {
    if (key.endsWith('_desc')) continue;
    if (key.startsWith('__') && key.endsWith('__')) continue; // skip __it__

    if (!en[`${key}_desc`]) t.fail(`en.json has '${key}', but should also have '${key}_desc'`);
  }

  t.pass();
});

test.cb('locales except en.json should not have keys ending with _desc', t => {
  t.plan(NUM_OF_LOCALIZATIONS - 1);

  const walker = walk.walk('../locales', { followLinks: false });

  // walk through each file, except en.json
  walker.on('file', (root, stat, next) => {
    if (stat.name !== 'en.json') {
      const path = `${root}/${stat.name}`;
      const xx = require(path); // eslint-disable-line global-require

      for (const key of Object.keys(xx)) {
        if (key.endsWith('_desc')) {
          t.fail(`'${stat.name}' cannot contain keys ending with '_desc', but '${key}' was found.`);
        }
      }

      t.pass();
    }

    next();
  });

  walker.on('end', () => {
    t.end();
  });
});

test.cb('locales should not have duplicates in them', t => {
  t.plan(NUM_OF_LOCALIZATIONS);

  let tmp = {};
  const walker = walk.walk('../locales', { followLinks: false });

  // walk through each file, except en.json
  walker.on('file', (root, stat, next) => {
    const path = `${root}/${stat.name}`;

    oboe(fs.createReadStream(path))
      .node('*', (v, k) => {
        if (!tmp[k]) {
          tmp[k] = 1;
        } else {
          t.fail(`Duplicate key '${k}' found in ${stat.name}`);
        }
      })
      .done((tree) => {
        tmp = {};
        if (Object.keys(tree).length > 0) { t.pass(); } else { t.fail(); }
        next();
      });
  });

  walker.on('end', () => {
    t.end();
  });
});

test.cb('locales should not have long keys with {{phone}}', t => {
  // The reason for that is how Telegram handles big messages. If the message
  // is more than 200 characters, phone number is not highlighted.
  // See details here: https://github.com/ro31337/libretaxi/issues/366

  t.plan(NUM_OF_LOCALIZATIONS);
  const walker = walk.walk('../locales', { followLinks: false });

  // walk through each file, except en.json
  walker.on('file', (root, stat, next) => {
    const path = `${root}/${stat.name}`;

    oboe(fs.createReadStream(path))
      .node('*', (v, k) => {
        if (typeof v === 'string' && v.includes('{{phone}}') && v.length > 150) {
          t.fail(`[${stat.name}] "${k}" value length is ${v.length}, max recommended is 150`);
        }
      })
      .done((tree) => {
        if (Object.keys(tree).length > 0) { t.pass(); } else { t.fail(); }
        next();
      });
  });

  walker.on('end', () => {
    t.end();
  });
});

// compare the number of "what" in str1 and str2, return false if not equal
const calcMatch = (str1, str2, what) => {
  const re = new RegExp(what, 'g');
  const cnt1 = (str1.match(re) || []).length;
  const cnt2 = (str2.match(re) || []).length;
  return cnt1 === cnt2;
};

test.cb('all translations should have the same number of format tags', t => {
  t.plan(NUM_OF_LOCALIZATIONS - 1);
  const walker = walk.walk('../locales', { followLinks: false });
  const en = require('../locales/en.json'); // eslint-disable-line global-require

  // walk through each file, except en.json
  walker.on('file', (root, stat, next) => {
    if (stat.name !== 'en.json') {
      const path = `${root}/${stat.name}`;
      const xx = require(path); // eslint-disable-line global-require

      for (const key of Object.keys(en)) {
        if (key.endsWith('_desc')) continue;

        if (!calcMatch(en[key], xx[key], '%')) {
          t.fail(`Number of % for ${key} in en.json and ${stat.name} is different`);
        }
        if (!calcMatch(en[key], xx[key], '{')) {
          t.fail(`Number of {{ for ${key} in en.json and ${stat.name} is different`);
        }
        if (!calcMatch(en[key], xx[key], '}')) {
          t.fail(`Number of }} for ${key} in en.json and ${stat.name} is different`);
        }
      }
      t.pass();
    }

    next();
  });

  walker.on('end', () => {
    t.end();
  });
});
