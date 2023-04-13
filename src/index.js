#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'fs';
import _ from 'lodash';

const diff = (path1, path2) => {
  const data1 = fs.readFileSync(path1, 'utf8');
  const obj1 = JSON.parse(data1);

  const data2 = fs.readFileSync(path2, 'utf8');
  const obj2 = JSON.parse(data2);

  const data1Arr = Object.entries(obj1).map(([key, value]) => ['-', key, value]);
  const data2Arr = Object.entries(obj2).map(([key, value]) => ['+', key, value]);

  data1Arr.forEach((element1) => {
    data2Arr.forEach((element2) => {
      const [, key1, value1] = element1;
      const [, key2, value2] = element2;
      if (key1 === key2 && value1 === value2) {
        // eslint-disable-next-line no-param-reassign
        element1[0] = ' ';
        // eslint-disable-next-line no-param-reassign
        element2[0] = ' ';
      }
    });
  });

  const filterdata2Arr = data2Arr.filter(([char]) => char !== ' ');

  const generalArr = [...data1Arr, ...filterdata2Arr];
  const generalSortedArr = _.sortBy(generalArr, ([, key]) => key);
  const generateString = generalSortedArr
    .map(([char, key, value]) => `${char} ${key}: ${value}`)
    .join('\n');
  return (`{\n${generateString}\n}`);
};

export default diff;
