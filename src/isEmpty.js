fs = require('fs')

module.exports = (input, item, dirs) =>
  fs.readdirSync(`${input}/${item}`).length !== 0 ? dirs.push(item) : ''
