#!/usr/bin/env node

const nocodelint = require('nocodelint');
const fs = require('fs');
const chalk = require('chalk');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(
  `
Usage
  $ nolint <file>

Options
  <file> The file to be linted

Examples
  $ nolint hello.no

  $ nolint index.no
    ✘ index.no isn't empty

  $ nolint
    ✘ At least one argument must be present

  $ nolint notthere.no
    ✘ notthere.no doesn't exist

  $ nolint something
    ✘ nocode files must have the .no file extension
`
);

if (cli.input.length === 0) {
  console.log(`${chalk.red('✘')} At least one argument must be present`);
  process.exit(1);
} else if (!cli.input[0].endsWith('.no') || !fs.existsSync(cli.input[0])) {
  if (!cli.input[0].endsWith('.no')) {
    console.log(
      `${chalk.red('✘')} nocode files must have the .no file extension`
    );
  }
  if (!fs.existsSync(cli.input[0])) {
    console.log(`${chalk.red('✘')} ${cli.input[0]} doesn't exist`);
  }
  process.exit(1);
} else {
  const result = nocodelint(fs.readFileSync(cli.input[0], 'utf-8'));
  if (!result) {
    console.log(`${chalk.red('✘')} ${cli.input[0]} isn't empty`);
  }
}
