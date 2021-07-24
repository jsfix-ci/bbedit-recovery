const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = obj => {
  try {
    fs.ensureDirSync(`${obj.output}/${obj.name}`)
    obj.items.dirs.map(item => {
      fs.copySync(`${obj.input}/${item}`, `${obj.output}/${obj.name}/${item}`)
    })
    obj.items.files.map(item => {
      fs.copySync(`${obj.input}/${item}`, `${obj.output}/${obj.name}/${item}`)
    })
  } catch {
    console.log(chalk.red('Error:'), chalk.white(`There was an error copying files`))
    process.exit(1)
  }
}
