/* eslint-disable no-new, no-console */
import test from 'ava';
import MapResponseHandler from '../../../src/response-handlers/cli/map-response-handler';
import MapResponse from '../../../src/responses/map-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new MapResponseHandler(args); });

test('can be constructed with default parameters', t => {
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  new MapResponseHandler({ response });
  t.pass();
});

test.cb('prints google maps link to console', t => {
  // arrange
  const response = new MapResponse({ location: [37.421955, -122.084058] });
  const h = new MapResponseHandler({ response });
  const tmp = console.log;
  console.log = ss.sinon.spy();

  // act
  h.call(() => {
    // assert
    t.truthy(console.log.calledWith('https://www.google.com/maps?q=37.421955,-122.084058'));
    console.log = tmp;
    t.end();
  });
});
