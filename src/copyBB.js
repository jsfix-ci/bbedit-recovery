const fs = require('fs-extra')

module.exports = obj => {
  try {
    fs.ensureDirSync(`${obj.output}/${obj.name}`)
    obj.items.dirs.map(item => {
      fs.copySync(`${obj.input}/${item}`, `${obj.output}/${obj.name}/${item}`)
    })
    obj.items.files.map(item => {
      fs.copySync(`${obj.input}/${item}`, `${obj.output}/${obj.name}/${item}`)
    })
  } catch (error) {
    console.log(error)
  }
}
