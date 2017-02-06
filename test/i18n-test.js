import test from 'ava';
import walk from 'walk';
import oboe from 'oboe';
import fs from 'fs';

const NUM_OF_LOCALIZATIONS = 7;

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
          t.fail(`'${stat.name}' cannot contani keys ending with '_desc', but '${key}' was found.`);
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
