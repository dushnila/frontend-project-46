#!/usr/bin/env node
/* eslint-disable import/extensions */
import diff from '../src/index.js';

const pass1 = '__fixtures__/file1.json';
const pass2 = '__fixtures__/file2.json';
const result = '{\n+ dos: true\n- follow: false\n- gorlum: false\n- heit: 55\n+ heit: 78\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

// eslint-disable-next-line no-undef
test('diff', () => {
  // eslint-disable-next-line no-undef
  expect(diff(pass1, pass2)).toBe(result);
});
