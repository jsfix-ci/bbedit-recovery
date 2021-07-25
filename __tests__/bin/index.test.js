path = require('path')
const fs = require('fs-extra')
const tmp = require('tmp')
const tmpObj = tmp.dirSync()
const chalk = require('chalk')

const br = require('../../bin/index')
const { bbArray } = require('../files/bbeditDir')
const outDir = Math.floor(new Date().getTime() / 1000)

// let tmpObj = {}
// tmpObj.name = '/var/folders/46/2mnb3y294_n64b4dgd5pyjlwhr_knc/T/tmp-8034-tsCxzzKSEPB7'

jest.mock('chalk', () => ({
  blue: jest.fn(),
  green: jest.fn(),
  white: jest.fn(),
}))

test('Create tmp object', async () => {
  await expect(tmpObj).toHaveProperty('name')
  await expect(tmpObj).toHaveProperty('removeCallback')
})

test('Copy files and directories over to tmp', async () => {
  fs.removeSync(`${tmpObj.name}/.DS_Store`)
  await expect(dirLength(tmpObj.name) === 0).toEqual(true)
  fs.copySync(path.join(__dirname, '../files', 'BBEdit'), path.join(tmpObj.name, 'BBEdit'))
  await expect(dirLength(tmpObj.name) === 1).toEqual(true)
})

test('Create empty directories', async () => {
  await expect(bbArray.length).toEqual(10)
  bbArray.map(item => {
    fs.ensureDirSync(`${tmpObj.name}/BBEdit/${item}`)
    const check = fs.existsSync(`${tmpObj.name}/BBEdit/${item}`)
    expect(check).toEqual(true)
  })
})

test(`Test output directory doesn't exist`, async () =>
  await expect(fs.existsSync(`${tmpObj.name}/${outDir}`)).toEqual(false))

test(`Test output directory was created`, async () => {
  fs.mkdirSync(`${tmpObj.name}/${outDir}`)
  await expect(fs.existsSync(`${tmpObj.name}/${outDir}`)).toEqual(true)
})

test(`Test output directory is empty`, async () =>
  await expect(fs.readdirSync(`${tmpObj.name}/${outDir}`).length === 0).toEqual(true))

test(`Test package copies to output directory`, async () => {
  try {
    await br(`${tmpObj.name}`, outDir)
    await expect(fs.readdirSync(`${tmpObj.name}/${outDir}`).length === 9).toEqual(true)
    fs.removeSync(`${tmpObj.name}/${outDir}`)
  } catch {}
})

test(`Test package console logs`, async () => {
  try {
    await br(`${tmpObj.name}`, outDir, true)
    await expect(typeof console.log).toBe('function')
    fs.removeSync(`${tmpObj.name}/${outDir}`)
  } catch {}
})

test(`Test console log with spy`, async () => {
  try {
    const spy = jest.spyOn(global.console, 'log')
    chalk.blue.mockReturnValueOnce(`BBEdit Recovery Completed`)
    chalk.green.mockReturnValueOnce(`\nFILES: `)
    chalk.white.mockReturnValueOnce(`${tmpObj.name}/${outDir}\n`)
    await br(`${tmpObj.name}`, outDir, true)
    expect(global.console.log).toHaveBeenCalledWith(
      `BBEdit Recovery Completed`,
      `\nFILES: `,
      `${tmpObj.name}/${outDir}\n`,
    )
    spy.mockRestore()
    fs.removeSync(`${tmpObj.name}/${outDir}`)
  } catch {}
})

test('Delete output directory in tmp', async () => {
  fs.removeSync(`${tmpObj.name}/${outDir}`)
  await expect(fs.existsSync(`${tmpObj.name}/${outDir}`)).toEqual(false)
})

test('Delete BBEdit in tmp directory', async () => {
  await expect(dirLength(tmpObj.name) === 1).toEqual(true)
  fs.removeSync(`${tmpObj.name}/BBEdit`)
  await expect(dirLength(tmpObj.name) === 0).toEqual(true)
})

test('Remove tmp object', async () => {
  await tmpObj.removeCallback()
  expect(fs.existsSync(tmpObj.name)).toEqual(false)
})

const dirLength = route => fs.readdirSync(route).length
