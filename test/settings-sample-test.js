import test from 'ava';
import Settings from '../settings-sample';

test('sample settings should have empty telegram token', t => {
  const settings = new Settings();
  t.is(settings.TELEGRAM_TOKEN, '');
});
