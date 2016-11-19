import sendMyNumber from './send-my-number';
import setMyPrice from './set-my-price';
import offerDiscount from './offer-discount';
import uuid from 'node-uuid';

/**
 * @typedef inlineButtons
 *
 * Unline buttons factory method that returns 3 buttons and their guids.
 *
 * @param {object} args - hash of parameters for buttons
 * @param {User} driver - driver instance
 * @return {Response} response - response expression
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-19
 * @version 1.1
 * @since 0.1.0
 */
export default (args, driver) => { // eslint-disable-line
  return {
    setMyPrice: {
      response: setMyPrice(args, driver),
      guid: uuid.v4(),
    },
    sendMyNumber: {
      response: sendMyNumber(args, driver),
      guid: uuid.v4(),
    },
    offerDiscount: {
      response: offerDiscount(args, driver),
      guid: uuid.v4(),
    },
  };
};
