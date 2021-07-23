fs = require('fs')

const isEmpty = require('./isEmpty')

module.exports = input => {
  let dirs = [],
    files = []

  fs.readdirSync(input).map(item => {
    fs.lstatSync(`${input}/${item}`).isDirectory() === true
      ? isEmpty(input, item, dirs)
      : item !== '.DS_Store'
      ? files.push(item)
      : ''
  })

  return { dirs, files }
}
