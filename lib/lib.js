const path = require('path')
const readline = require('readline')
const execa = require('execa')
const fs = require('fs-extra')

function askToInstallPods() {
  if (!process.stdin.isTTY) {
    return Promise.resolve(false)
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(
      'Do you want to install iOS CocoaPods dependencies now? (bundle install + pod install) [Y/n] ',
      (answer) => {
        rl.close()
        const normalized = (answer || 'y').trim().toLowerCase()
        resolve(normalized === '' || normalized === 'y' || normalized === 'yes')
      }
    )
  })
}

const IOS_PLACEHOLDER = '__APP_NAME__'
const PACKAGE_PLACEHOLDER = '__PACKAGE_IDENTIFIER__'
const PACKAGE_PATH_PLACEHOLDER = '__PACKAGE_PATH__'

const TEXT_EXTENSIONS = new Set([
  'env', 'gradle', 'json', 'js', 'kt', 'md', 'plist', 'pbxproj', 'storyboard', 'swift',
  'ts', 'tsx', 'xcprivacy', 'xcscheme', 'xml'
])
const NO_EXT_TEXT_FILES = new Set(['Podfile', 'Gemfile', '.watchmanconfig', '.gitignore', '.npmrc', 'config'])

function isTextFile(name) {
  const ext = path.extname(name).slice(1).toLowerCase()
  return TEXT_EXTENSIONS.has(ext) || NO_EXT_TEXT_FILES.has(name)
}

function replacePlaceholders(content, name, packageIdentifier) {
  if (!content.includes(IOS_PLACEHOLDER) && !content.includes(PACKAGE_PLACEHOLDER)) return content
  return content
    .split(IOS_PLACEHOLDER).join(name)
    .split(PACKAGE_PLACEHOLDER).join(packageIdentifier)
}

const ROOT_SKIP_DIRS = new Set(['android', 'ios'])

function copyGeneralTemplate(srcDir, destDir, name, packageIdentifier) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.isDirectory() && ROOT_SKIP_DIRS.has(ent.name)) continue
    const srcPath = path.join(srcDir, ent.name)
    const destPath = path.join(destDir, ent.name)
    if (ent.isDirectory()) {
      fs.ensureDirSync(destPath)
      copyGeneralTemplate(srcPath, destPath, name, packageIdentifier)
      continue
    }
    fs.ensureDirSync(path.dirname(destPath))
    if (isTextFile(ent.name)) {
      let content = fs.readFileSync(srcPath, 'utf8')
      content = replacePlaceholders(content, name, packageIdentifier)
      fs.writeFileSync(destPath, content, 'utf8')
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyAndroidTemplate(srcDir, destDir, name, packageIdentifier) {
  function walk(sDir, dDir) {
    const entries = fs.readdirSync(sDir, { withFileTypes: true })
    for (const ent of entries) {
      const srcPath = path.join(sDir, ent.name)
      if (ent.isDirectory()) {
        if (ent.name === PACKAGE_PATH_PLACEHOLDER) {
          const packagePath = packageIdentifier.split('.').join(path.sep)
          const expandedDest = path.join(dDir, packagePath)
          fs.ensureDirSync(expandedDest)
          walk(srcPath, expandedDest)
        } else {
          const destPath = path.join(dDir, ent.name)
          fs.ensureDirSync(destPath)
          walk(srcPath, destPath)
        }
        continue
      }
      const destPath = path.join(dDir, ent.name)
      fs.ensureDirSync(path.dirname(destPath))
      if (isTextFile(ent.name)) {
        let content = fs.readFileSync(srcPath, 'utf8')
        content = replacePlaceholders(content, name, packageIdentifier)
        fs.writeFileSync(destPath, content, 'utf8')
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
  walk(srcDir, destDir)
}

function copyIosTemplateWithPlaceholders(srcIosDir, destIosDir, name, packageIdentifier) {
  const entries = fs.readdirSync(srcIosDir, { withFileTypes: true })
  for (const ent of entries) {
    const srcPath = path.join(srcIosDir, ent.name)
    const destName = ent.name.split(IOS_PLACEHOLDER).join(name)
    const destPath = path.join(destIosDir, destName)

    if (ent.isDirectory()) {
      fs.ensureDirSync(destPath)
      copyIosTemplateWithPlaceholders(srcPath, destPath, name, packageIdentifier)
      continue
    }

    fs.ensureDirSync(path.dirname(destPath))
    if (isTextFile(ent.name)) {
      let content = fs.readFileSync(srcPath, 'utf8')
      content = replacePlaceholders(content, name, packageIdentifier)
      fs.writeFileSync(destPath, content, 'utf8')
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

async function createReactNativeProject({ name, projectDir, packageIdentifier, license }) {
  console.info(
    `CREATE new React Native Project with the following options:
  name: ${name}
  packageIdentifier: ${packageIdentifier}
  projectDir: ${projectDir}
  license: ${license}
  `,
  )

  console.info('CREATE: Generating the React Native Project')

  const commandSync = execa.commandSync

  await fs.ensureDir(projectDir)
  const templatesDir = path.resolve(__dirname, '../templates')
  copyGeneralTemplate(templatesDir, projectDir, name, packageIdentifier)
  await fs.ensureDir(path.join(projectDir, 'android'))
  copyAndroidTemplate(
    path.join(templatesDir, 'android'),
    path.join(projectDir, 'android'),
    name,
    packageIdentifier
  )
  await fs.ensureDir(path.join(projectDir, 'ios'))
  copyIosTemplateWithPlaceholders(
    path.join(templatesDir, 'ios'),
    path.join(projectDir, 'ios'),
    name,
    packageIdentifier
  )

  commandSync(`yarn install`, { cwd: `./${projectDir}`, stdio: 'inherit' })

  const installPods = await askToInstallPods()
  if (installPods) {
    commandSync(`bundle install`, { cwd: `./${projectDir}`, stdio: 'inherit' })
    commandSync(`bundle exec pod install`, { cwd: `./${projectDir}/ios`, stdio: 'inherit' })
  } else {
    console.info(
      'Skipped. You can install iOS dependencies later with:\n  cd ' +
        projectDir +
        '\n  bundle install\n  cd ios && bundle exec pod install'
    )
  }
}

module.exports = createReactNativeProject
