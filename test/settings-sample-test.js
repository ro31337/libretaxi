import test from 'ava';
import Settings from '../settings-sample';

test('sample settings should have some empty tokens/keys', t => {
  const settings = new Settings();
  t.is(settings.TELEGRAM_TOKEN, '');
  t.is(settings.GEOCODING_API_KEY, '');
});
