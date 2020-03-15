const paramCase = require('param-case')

const pascalCase = require('pascal-case')

module.exports = options => {
  const name = options.name
  if (typeof name !== 'string') {
    throw new TypeError("Please write your project's name")
  }

  const packageIdentifier = options.packageIdentifier || `com.example.${name.toLowerCase()}`
  const projectDir = options.projectDir || name

  return {
    name: `${pascalCase(name)}`,
    projectDir,
    packageIdentifier,
    license: options.license,
  }
}
