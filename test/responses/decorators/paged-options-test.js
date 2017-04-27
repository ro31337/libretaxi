/* eslint-disable no-new, max-len */
import test from 'ava';
import PagedOptions from '../../../src/responses/decorators/paged-options';
import OptionsResponse from '../../../src/responses/options-response';

// generate buttons, 1 button per row
const generateButtons = (n) => {
  const rows = [];
  for (let m = 1; m <= n; m++) {
    rows.push([{ label: `Label ${m}`, value: m }]);
  }
  return rows;
};

test('can be constructed with default parameters', t => {
  const r = new PagedOptions(
    1,
    new OptionsResponse({
      rows: [[{ label: 'Ok', value: 'ok' }]],
    }));
  t.is(r.type, 'options');
  t.is(r.origin.type, 'options');
});

test('should have six buttons for the first page', t => {
  const r = new PagedOptions(
    1,
    new OptionsResponse({
      rows: generateButtons(6),
    }));
  t.is(r.rows.length, 3);
  t.is(r.rows[0][0].value, 1);
  t.is(r.rows[0][1].value, 2);
  t.is(r.rows[1][0].value, 3);
  t.is(r.rows[1][1].value, 4);
  t.is(r.rows[2][0].value, 5);
  t.is(r.rows[2][1].value, 6);
});

test('should have two pages for 7 buttons', t => {
  const r = new PagedOptions(
    2,
    new OptionsResponse({
      rows: generateButtons(7),
    }));
  t.is(r.totalPages, 2);
  t.is(r.rows.length, 2);
  t.is(r.rows[0][0].value, 6);
  t.is(r.rows[0][1].value, 7);
  t.is(r.rows[1][0].value, 'previous');
  t.falsy(r.rows[1][1]);
});

test('should have three pages for 12 buttons', t => {
  const rsOptions = new OptionsResponse({
    rows: generateButtons(12),
  });
  const page1 = new PagedOptions(1, rsOptions);
  t.is(page1.totalPages, 3);
  t.is(page1.currentPage, 1);
  t.is(page1.rows.length, 3);
  t.is(page1.rows[0][0].value, 1);
  t.is(page1.rows[0][1].value, 2);
  t.is(page1.rows[1][0].value, 3);
  t.is(page1.rows[1][1].value, 4);
  t.is(page1.rows[2][0].value, 5);
  t.is(page1.rows[2][1].value, 'next');

  const page2 = new PagedOptions(2, rsOptions);
  t.is(page2.totalPages, 3);
  t.is(page2.currentPage, 2);
  t.is(page2.rows.length, 3);
  t.is(page2.rows[0][0].value, 6);
  t.is(page2.rows[0][1].value, 7);
  t.is(page2.rows[1][0].value, 8);
  t.is(page2.rows[1][1].value, 9);
  t.is(page2.rows[2][0].value, 'previous');
  t.is(page2.rows[2][1].value, 'next');

  const page3 = new PagedOptions(3, rsOptions);
  t.is(page3.totalPages, 3);
  t.is(page3.currentPage, 3);
  t.is(page3.rows.length, 2);
  t.is(page3.rows[0][0].value, 10);
  t.is(page3.rows[0][1].value, 11);
  t.is(page3.rows[1][0].value, 'previous');
  t.is(page3.rows[1][1].value, 12);
});

test('shoduld return correct number of pages', t => {
  const x = (n) => {
    const r = new PagedOptions(
      1,
      new OptionsResponse({ rows: generateButtons(n) }),
    );
    return r.totalPages;
  };
  t.is(x(1), 1);
  t.is(x(2), 1);
  t.is(x(3), 1);
  t.is(x(4), 1);
  t.is(x(5), 1);
  t.is(x(6), 1);
  t.is(x(7), 2);
  t.is(x(8), 2);
  t.is(x(9), 2);
  t.is(x(10), 2);
  t.is(x(11), 3);
  t.is(x(12), 3);
  t.is(x(13), 3);
  t.is(x(14), 3);
  t.is(x(15), 4);
});

test('should accept weird number of pages', t => {
  const o = new OptionsResponse({ rows: generateButtons(10) });
  t.is(new PagedOptions(undefined, o).currentPage, 1);
  t.is(new PagedOptions(100, o).currentPage, 2);
  t.is(new PagedOptions(0, o).currentPage, 1);
  t.is(new PagedOptions(-1, o).currentPage, 1);
  t.is(new PagedOptions(1.123, o).currentPage, 2);
  t.is(new PagedOptions('0', o).currentPage, 1);
  t.is(new PagedOptions(' 2 ', o).currentPage, 2);
});

test('when decorated should keep other origin props', t => {
  const o = new OptionsResponse({
    rows: generateButtons(10),
    message: 'foo',
    defaultMessage: 'bar',
  });
  const r = new PagedOptions(1, o);
  t.is(r.message, 'foo');
  t.is(r.defaultMessage, 'bar');
});

test('should return next or previous page', t => {
  const r = new PagedOptions(
    2,
    new OptionsResponse({ rows: generateButtons(20) }),
  );
  t.is(r.nextPageNumber('next'), 3);
  t.is(r.nextPageNumber('previous'), 1);
});
