import test from 'ava';
import Settings from '../settings';

test('not in settings, but test environment should be explicitly specified', t => {
  t.truthy(process.env.TEST_ENVIRONMENT);
});

test('settings props should be specified', t => {
  const settings = new Settings();
  t.truthy(settings.STATEFUL_CONNSTR);
  t.truthy(settings.STATEFUL_CREDENTIALS_FILE);
  t.truthy(settings.TELEGRAM_TOKEN);
  t.truthy(settings.DEFAULT_LANGUAGE);
  t.truthy(settings.LOG_FILE);
  t.truthy(settings.GEOCODING_API_KEY);
  t.is(settings.MAX_RADIUS, 10);
});

test('should allow to override props', t => {
  const settings = new Settings({ MAX_RADIUS: 31337 });
  t.is(settings.MAX_RADIUS, 31337);
});
