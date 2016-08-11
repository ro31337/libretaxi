/* eslint-disable no-new, no-console */
import test from 'ava';
import RequestUserInputResponseHandler from '../../../src/response-handlers/cli/request-user-input-response-handler'; // eslint-disable-line max-len
import RequestUserInputResponse from '../../../src/responses/request-user-input-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import { ss } from '../../spec-support';

checkNotNullTest('response', (args) => { new RequestUserInputResponseHandler(args); });

const responseObject = new RequestUserInputResponse();

test('can be constructed with default parameters', t => {
  new RequestUserInputResponseHandler({ response: {} });
  t.pass();
});

test.cb('calls inquirer library with correct parameters', t => {
  // arrange
  const lib = {
    prompt: ss.sinon.stub().returns(
        new Promise((resolve) => {
          resolve({ message: 'bla bla' });
        })
      ),
  };
  const h = new RequestUserInputResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (resultValue) => {
    t.is(resultValue, 'bla bla');
    t.truthy(lib.prompt.calledWith([
      {
        type: 'input',
        name: 'message',
        message: 'Your input',
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
  const h = new RequestUserInputResponseHandler({
    response: responseObject,
    lib, // <= inject our library
  });

  // assert
  const assert = (actualMessage) => {
    const expectedMessage = `Error in RequestUserInputResponseHandler: ${err}`;
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
