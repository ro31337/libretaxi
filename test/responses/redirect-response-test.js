/* eslint-disable no-new */
import test from 'ava';
import RedirectResponse from '../../src/responses/redirect-response';

test('can be constructed with default parameters', t => {
  new RedirectResponse({ path: './foo.js' });
  t.pass();
});

test('should save path as property and have redirect type', t => {
  const r = new RedirectResponse({ path: './foo.js' });
  t.is(r.path, './foo.js');
  t.is(r.type, 'redirect');
});

test.cb('should throw argument error when path not specified', t => {
  const err = 'path parameter not specified';

  t.throws(() => {
    new RedirectResponse();
  }, err);

  t.end();
});

test.cb('should throw argument error when path format invalid', t => {
  const err = 'path format invalid';

  const valid = ['./foo.js',
    '../foo.js',
    '../foo/bar/something.js',
    '/0.1.0/foo.js',
    '/0.1.0/dir/foo.js',
    '/1.2.3/dir/foo.js',
    '/1.2.3/dir/foo-bar.js',
  ];

  const invalid = [
    '../foo',
    '/0.1.0/foo',
    '/foo/bar/something.js',
    '/foo/bar/',
    'xxx/0.1.0/dir/foo.js',
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
