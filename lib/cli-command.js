const emoji = require('node-emoji');

const normalizedOptions = require('./normalized-options');

const createReactNativeProject = require('./lib');

module.exports = {
  name: 'react-native-create-app',
  description: 'creates a react native project.',
  usage: '[options] <name>',
  func: async (args, config, options) => {
    const name = args[0];

    const beforeCreation = Date.now();

    const preNormalizedOptions = Object.assign({}, { name }, options);

    const createOptions = normalizedOptions(preNormalizedOptions);
    const projectDir = createOptions.projectDir;

    try {
      await createReactNativeProject(createOptions);
      console.log(`
${emoji.get('books')}  Created react native project ${name} in \`./${projectDir}\`.
${emoji.get('clock9')}  It took ${Date.now() - beforeCreation}ms.`);
    } catch (err) {
      console.error(`Error while creating react native project ${name}`);
      if (err.stack) {
        console.error(err.stack);
      }
    }
  },
  options: [
    {
      command: '-p, --package-identifier [packageIdentifier]',
      description:
        'Application Id on Android or Bundle Identifier on iOS, Default: com.example.(name in lower case)',
      default: ''
    },
    {
      command: '-d, --project-dir [projectDir]',
      description: 'The project dir name, Default: Same as project name',
      default: ''
    },
    {
      command: '--license [license]',
      description: 'The license type',
      default: 'MIT'
    }
  ]
};
