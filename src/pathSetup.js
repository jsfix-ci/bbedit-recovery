fs = require('fs')
path = require('path')
const { homedir } = require('os')
const chalk = require('chalk')

module.exports = p => {
  try {
    if (p.toLowerCase() === 'desktop') return path.join(homedir(), 'Desktop')
    if (p.toLowerCase().match(/(docs|documents)/)) return path.join(homedir(), 'Documents')
    return fs.lstatSync(p).isDirectory() === true ? p : new Error()
  } catch {
    console.log(chalk.red('Error:'), chalk.white(`Path is not a valid directory`))
    process.exit(1)
  }
}
