path = require('path')
const { homedir } = require('os')

module.exports = p => {
  const sp = p.trim()

  if (sp.toLowerCase() === 'desktop') return path.join(homedir(), 'Desktop')
  if (sp.toLowerCase().match(/(docs|documents)/)) return path.join(homedir(), 'Documents')
}
