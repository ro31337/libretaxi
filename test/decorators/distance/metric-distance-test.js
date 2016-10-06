/* eslint-disable no-new, no-console */
import test from 'ava';
import MetricDistance from '../../../src/decorators/distance/metric-distance';
import { i18n } from '../../spec-support';

test('should decorate with float', t => {
  const md = new MetricDistance(i18n, 7.123);
  t.is(md.toString(), '7.1 km');
});

test('should decorate with integer', t => {
  const md = new MetricDistance(i18n, 7);
  t.is(md.toString(), '7.0 km');
});
