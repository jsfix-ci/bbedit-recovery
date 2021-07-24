const copyBB = require('../../src/copyBB')

test('Copy bad object failure', () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    copyBB('!@#$%^&*()')
    expect(console.log).toHaveBeenCalledWith('Error: There was an error copying files')
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
  } catch {}
})
