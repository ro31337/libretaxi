/* eslint-disable no-new, no-console */
import test from 'ava';
import GoogleMapsLink from '../../../src/decorators/location/google-maps-link';

test('should decorate', t => {
  const location = [37.421955, -122.084058];
  const link = new GoogleMapsLink(location).toString();
  t.is(link, `https://www.google.com/maps?q=${location[0]},${location[1]}`);
});
