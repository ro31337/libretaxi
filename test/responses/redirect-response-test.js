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
