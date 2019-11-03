const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');
const templates = require('../templates');

async function renderTemplateIfValid(root, template, templateArgs) {
  // avoid throwing an exception in case there is no valid template.name member
  const name = !!template.name && template.name(templateArgs);
  if (!name) return;

  const filename = path.join(root, name);
  const [baseDir] = filename.split(path.basename(filename));

  await fs.ensureDir(baseDir);
  return await fs.outputFile(filename, template.content(templateArgs));
}

async function createReactNativeProject({ name, projectDir, packageIdentifier, license }) {
  console.info(
    `CREATE new React Native Project with the following options:
  name: ${name}
  packageIdentifier: ${packageIdentifier}
  projectDir: ${projectDir}
  license: ${license}
  `,
  );

  console.info('CREATE: Generating the React Native Project');

  const commandSync = execa.commandSync;

  await fs.ensureDir(projectDir);
  const templatesDir = path.resolve(__dirname, '../templates');
  await Promise.all([
    fs.copy(path.join(templatesDir, 'android'), path.join(projectDir, 'android')),
    fs.copy(path.join(templatesDir, 'ios'), path.join(projectDir, `ios/${name}`)),
  ]);
  await Promise.all(
    templates.map(template => {
      const templateArgs = {
        name,
        packageIdentifier,
        license,
      };
      return renderTemplateIfValid(projectDir, template, templateArgs);
    }),
  );

  commandSync(`yarn install`, { cwd: `./${projectDir}`, stdio: 'inherit' });
  commandSync(`pod install`, { cwd: `./${projectDir}/ios`, stdio: 'inherit' });
}

module.exports = createReactNativeProject;
