#!/usr/bin/env node
/* eslint-disable import/extensions */

import { Command } from 'commander';
import diff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<path1>', 'path to file')
  .argument('<path2>', 'path to file')
  .option('-f, --format <type>', 'output format')
  .action(diff);

program.parse(process.argv);
