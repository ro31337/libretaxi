/* eslint-disable no-new, no-console */
import test from 'ava';
import RequestLocationResponseHandler from '../../../src/response-handlers/cli/request-location-response-handler'; // eslint-disable-line max-len
import RequestLocationResponse from '../../../src/responses/request-location-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new RequestLocationResponseHandler(args); });

const responseObject = new RequestLocationResponse();

test('can be constructed with default parameters', t => {
  new RequestLocationResponseHandler({ response: {} });
  t.pass();
});

test.cb('calls inquirer library with correct parameters', t => {
  // arrange
  const lib = {
    prompt: ss.sinon.stub().returns(
        new Promise((resolve) => {
          resolve({ value: 123 });
        })
      ),
  };
  const h = new RequestLocationResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (resultValue) => {
    t.is(resultValue, 123);
    t.truthy(lib.prompt.calledWith([
      {
        type: 'list',
        name: 'value',
        message: 'Your choice?',
        choices: [
          { name: 'Golden Gate Bridge', value: [37.818293, -122.478375] },
          { name: 'Embarcadero BART station', value: [37.792863, -122.396889] },
          { name: 'South San Francisco BART station', value: [37.664059, -122.443742] },
          { name: 'IKEA East Palo Alto', value: [37.461088, -122.139215] },
          { name: 'GooglePlex', value: [37.421955, -122.084058] },
        ],
      },
    ]));
    t.end();
  };

  // act
  h.call(assert);
});

test.cb('handles error while using inquirer library', t => {
  // arrange
  const err = 'Sample error';
  const lib = {
    prompt: () => new Promise((resolve, reject) => { reject(err); }),
  };
  const h = new RequestLocationResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (actualMessage) => {
    const expectedMessage = `Error in RequestLocationResponseHandler: ${err}`;
    t.is(actualMessage, expectedMessage);
    t.end();

    // cleanup
    console.log = tmp; // eslint-disable-line no-use-before-define
  };

  const tmp = console.log;
  console.log = assert;

  // act
  h.call(() => {});
});
