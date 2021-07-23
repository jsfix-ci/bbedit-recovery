#!/usr/bin/env node

const program = require('commander')

const { name, version, description } = require('../package.json')
const intro = require('../src/intro')
const main = require('../bin/index')

const cli = () => {
  program
    .command('intro')
    .description('Draw app banner')
    .action(() => intro(version, description))

  program
    .version(version)
    .name(name)
    .description(description)
    .option('-d, --dest [folder]', 'Directory to be piped out to', 'default')
    .action(async () => {
      await main(program._optionValues.dest)
    })

  program.parse(process.argv)
}

cli()
