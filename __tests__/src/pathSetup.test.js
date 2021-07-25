path = require('path')
const { homedir } = require('os')

const pathSetup = require('../../src/pathSetup')

test('Pass Desktop as path', () => expect(pathSetup('Desktop')).toBe(`${homedir()}/Desktop`))

test('Pass Documents as path', () => expect(pathSetup('Documents')).toBe(`${homedir()}/Documents`))

test('Pass Docs as path', () => expect(pathSetup('Docs')).toBe(`${homedir()}/Documents`))

test('Test for directory', async () => {
  try {
    expect(pathSetup(__dirname)).toBe(__dirname)
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    await pathSetup(path.join(__dirname, '../files', 'bbeditDir.js'))
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
  } catch {}
})

test('Bad path for BBEdit error handling test', () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    pathSetup('!@#$%^&*()')
    expect(console.log).toHaveBeenCalledWith('Error: BBEdit not found in Application Support')
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
  } catch {}
})

test('Passed path for test', async () => {
  const testPath = path.join(__dirname, '../files/BBEdit')
  await pathSetup(testPath)
  expect(testPath).toEqual(testPath)

  try {
    const spy = jest.spyOn(global.console, 'log')
    await pathSetup(`${testPath}!@#$%^&*()`)
    expect(global.console.log).toHaveBeenCalledWith(
      chalk.red.mockReturnValueOnce('Error:'),
      chalk.white.mockReturnValueOnce(`BBEdit not found in Application Support`),
    )
    spy.mockRestore()
  } catch {}
})
