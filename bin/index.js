const chalk = require('chalk')

const pathSetup = require('../src/pathSetup')
const findBB = require('../src/findBB')
const itemsBB = require('../src/itemsBB')
const copyBB = require('../src/copyBB')

module.exports = async (dest, name, cli = false) => {
  try {
    const obj = {
      input: await findBB(),
      output: await pathSetup(dest),
      name,
    }
    obj.items = await itemsBB(obj.input)

    await copyBB(obj)

    cli === true
      ? console.log(
          chalk.blue(`BBEdit Recovery Completed`),
          chalk.green(`\nFILES: `),
          chalk.white(`${obj.output}/${obj.name}\n`),
        )
      : ''
  } catch {
    console.log(chalk.red('Error:'), chalk.white(`Ran into run error`))
    process.exit(1)
  }
}
