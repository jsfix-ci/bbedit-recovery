path = require('path')
const chalk = require('chalk')

const findBB = require('../../src/findBB')

jest.mock('chalk', () => ({
  red: jest.fn(),
  white: jest.fn(),
}))

test('Bad path for BBEdit error handling test', () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    findBB('!@#$%^&*()')
    expect(console.log).toHaveBeenCalledWith('Error: BBEdit not found in Application Support')
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
  } catch {}
})

test('Passed path for test', async () => {
  const testPath = path.join(__dirname, '../files/BBEdit')
  await findBB(testPath)
  expect(testPath).toEqual(testPath)

  try {
    const spy = jest.spyOn(global.console, 'log')

    await findBB(`${testPath}!@#$%^&*()`)
    expect(global.console.log).toHaveBeenCalledWith(
      chalk.red.mockReturnValueOnce('Error:'),
      chalk.white.mockReturnValueOnce(`BBEdit not found in Application Support`),
    )
    spy.mockRestore()
  } catch {}
})

test('Passed file for test', async () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    await findBB(path.join(__dirname, '../files', 'bbeditDir.js'))
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
  } catch {}
})
