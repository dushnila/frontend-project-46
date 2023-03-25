#!/usr/bin/env node
import fs from 'fs';
import _ from 'lodash';
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<path1>', 'path to file')
  .argument('<path2>', 'path to file')
  .option('-f, --format <type>',  'output format')
  .action((path1, path2) => {
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
          element1[0] = ' ';
          element2[0] = ' ';
        }
      })
    })
    
    const filterdata2Arr = data2Arr.filter(([char]) => char !== ' ');

    const generalArr = [...data1Arr, ...filterdata2Arr];
    const generalSortedArr = _.sortBy(generalArr, ([, key]) => key);
    const generateString = generalSortedArr
    .map(([char, key, value]) => {
      return `${char} ${key}: ${value}`;
    })
    .join('\n')
    console.log(`{\n${generateString}\n}`);
  });

program.parse(process.argv);

