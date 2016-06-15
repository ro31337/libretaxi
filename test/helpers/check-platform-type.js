import test from 'ava';

module.exports = (f) => {
  test.cb('should check platform type', t => {
    const err = 'platform type \'foo\' not supported';
    t.throws(() => { f(); }, err);
    t.end();
  });
};
