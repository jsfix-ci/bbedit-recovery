const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

module.exports = (v, d) => {
  clear()
  console.log(
    chalk.blue(
      figlet.textSync('BBEdit Recovery', {
        horizontalLayout: 'full',
        kerning: 'full',
      }),
    ),
  )
  console.log(chalk.white('Version: '), chalk.cyan(v))
  console.log(chalk.white('Description: '), chalk.cyan(d))
}
