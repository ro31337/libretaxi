/* eslint-disable no-new, no-console */
import test from 'ava';
import RequestPhoneResponseHandler from '../../../src/response-handlers/cli/request-phone-response-handler'; // eslint-disable-line max-len
import RequestPhoneResponse from '../../../src/responses/request-phone-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new RequestPhoneResponseHandler(args); });

const responseObject = new RequestPhoneResponse();

test('can be constructed with default parameters', t => {
  new RequestPhoneResponseHandler({ response: {} });
  t.pass();
});

test.cb('calls inquirer library with correct parameters', t => {
  // arrange
  const lib = {
    prompt: ss.sinon.stub().returns(
        new Promise((resolve) => {
          resolve({ phone: '123' });
        })
      ),
  };
  const h = new RequestPhoneResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (resultValue) => {
    t.is(resultValue, '123');
    t.truthy(lib.prompt.calledWith([
      {
        type: 'input',
        name: 'phone',
        message: 'Your phone number',
        default: '(555) 111-22-33',
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
  const h = new RequestPhoneResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (actualMessage) => {
    const expectedMessage = `Error in RequestPhoneResponseHandler: ${err}`;
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
