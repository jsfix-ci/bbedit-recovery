fs = require('fs')
path = require('path')
const { homedir } = require('os')
const chalk = require('chalk')

module.exports = () => {
  try {
    const bbPath = path.join(homedir(), 'Library', 'Application Support', 'BBEdit')
    return fs.lstatSync(bbPath).isDirectory() === true ? bbPath : new Error()
  } catch {
    console.log(chalk.red('Error:'), chalk.white(`BBEdit not found in Application Support`))
    process.exit(1)
  }
}
