/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import test from 'ava';

const ss = {}; // stands for spec support
export default ss;

test.beforeEach(t => {
  ss.sinon = sinon.sandbox.create();
});

test.afterEach.always(t => {
  ss.sinon.restore();
});
