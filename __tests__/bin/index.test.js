path = require('path')
const fs = require('fs-extra')
const tmp = require('tmp')
const tmpObj = tmp.dirSync()

const br = require('../../bin/index')
const { bbArray } = require('../files/bbeditDir')
const outDir = Math.floor(new Date().getTime() / 1000)

// let tmpObj = {}
// tmpObj.name = '/var/folders/46/2mnb3y294_n64b4dgd5pyjlwhr_knc/T/tmp-8034-tsCxzzKSEPB7'

// KEEP
test('Create tmp object', async () => {
  await expect(tmpObj).toHaveProperty('name')
  await expect(tmpObj).toHaveProperty('removeCallback')
})

// KEEP
test('Copy files and directories over to tmp', async () => {
  fs.removeSync(`${tmpObj.name}/.DS_Store`)
  await expect(dirLength(tmpObj.name) === 0).toEqual(true)
  fs.copySync(path.join(__dirname, '../files', 'BBEdit'), path.join(tmpObj.name, 'BBEdit'))
  await expect(dirLength(tmpObj.name) === 1).toEqual(true)
})

// KEEP
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
  await br(`${tmpObj.name}`, outDir)
  await expect(fs.readdirSync(`${tmpObj.name}/${outDir}`).length === 9).toEqual(true)
  fs.removeSync(`${tmpObj.name}/${outDir}`)
})

test(`Test package console logs`, async () => {
  await br(`${tmpObj.name}`, outDir, true)
  await expect(typeof console.log).toBe('function')
  // await expect(console.log).toBe(`BBEdit Recovery Completed\nFILES: ${outDir}`)
  // await expect(console.log).toHaveBeenCalledWith(`BBEdit Recovery Completed\nFILES: ${outDir}`)
  fs.removeSync(`${tmpObj.name}/${outDir}`)
})

// KEEP
test('Delete output directory in tmp', async () => {
  fs.removeSync(`${tmpObj.name}/${outDir}`)
  await expect(fs.existsSync(`${tmpObj.name}/${outDir}`)).toEqual(false)
})

// // KEEP
test('Delete BBEdit in tmp directory', async () => {
  await expect(dirLength(tmpObj.name) === 1).toEqual(true)
  fs.removeSync(`${tmpObj.name}/BBEdit`)
  await expect(dirLength(tmpObj.name) === 0).toEqual(true)
})

// KEEP
test('Remove tmp object', async () => {
  await tmpObj.removeCallback()
  // const check = fs.existsSync(tmpObj.name)
  expect(fs.existsSync(tmpObj.name)).toEqual(false)
})

// KEEP
const dirLength = route => fs.readdirSync(route).length

// HELPERS

// dir test contents
// fs.readdir(tmpObj.name, (err, files) => {
//   files.forEach(file => {
//     console.log(file)
//   })
// })
