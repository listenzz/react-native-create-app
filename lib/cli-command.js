const emoji = require('node-emoji')

const normalizedOptions = require('./normalized-options')

const createReactNativeProject = require('./lib')

module.exports = {
  name: 'react-native-create-app',
  description: 'creates a react native project.',
  usage: '[options] <projectName>',
  func: async (args, config, options) => {
    const name = args[0]

    const beforeCreation = Date.now()

    const preNormalizedOptions = Object.assign({}, { name }, options)

    const createOptions = normalizedOptions(preNormalizedOptions)
    const projectDir = createOptions.projectDir

    try {
      await createReactNativeProject(createOptions)
      console.log(`
${emoji.get('books')}  Created react native project ${name} in \`./${projectDir}\`.
${emoji.get('clock9')}  It took ${Date.now() - beforeCreation}ms.`)
    } catch (err) {
      console.error(`Error while creating react native project ${name}`)
      if (err.stack) {
        console.error(err.stack)
      }
    }
  },
  options: [
    {
      command: '-p, --package-identifier [string]',
      description:
        'Application id on Android or Bundle Identifier on iOS (default: "com.example.(<projectName> in lower case)',
    },
    {
      command: '-d, --directory [string]',
      description: 'Uses a custom directory instead of `<projectName>`',
    },
    {
      command: '--license [string]',
      description: 'The license type',
      default: 'MIT',
    },
  ],
}
