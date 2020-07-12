module.exports = [
  {
    name: () => 'README.md',
    content: ({ name }) => {
      return `# ${name}`
    },
  },
  {
    name: () => 'package.json',
    content: ({ name }) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start --reset-cache",
    "test": "jest",
    "tsc": "tsc --noEmit",
    "lint": "eslint . --fix --ext .js,.jsx,.ts,.tsx"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && tsc",
      "post-commit": "git update-index --again"
    }
  },
  "lint-staged": {
    "*.{js,ts,tsx,jsx}": [
      "eslint . --fix",
      "git add"
    ]
  },
  "dependencies": {
    "react": "16.13.1",
    "react-native": "^0.63.0",
    "react-native-fast-image": "^8.1.5",
    "react-native-navigation-hybrid": "^0.23.0"
  },
  "devDependencies": {
    "@babel/core": "^7.8.4",
    "@babel/runtime": "^7.8.4",
    "@gfez/eslint-config-react-native": "^1.0.0",
    "@types/jest": "^25.2.1",
    "@types/react": "^16.8.14",
    "@types/react-native": "^0.62.7",
    "@types/react-test-renderer": "16.9.0",
    "babel-jest": "^26.0.1",
    "husky": "^4.2.5",
    "jest": "^26.0.1",
    "lint-staged": "^10.2.2",
    "metro-react-native-babel-preset": "^0.59.0",
    "react-native-testing-library": "^1.7.0",
    "react-test-renderer": "16.13.1",
    "typescript": "^3.7.3"
  },
  "jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
}
`,
  },
  {
    name: () => 'index.js',
    content: ({ name }) => `import App from './App'
import { ReactRegistry, Garden, Navigator } from 'react-native-navigation-hybrid'

// 配置全局样式
Garden.setStyle({
  topBarStyle: 'dark-content',
})

// 重要必须
ReactRegistry.startRegisterComponent()

// 注意，你的每一个页面都需要注册
ReactRegistry.registerComponent('Home', () => App)

// 重要必须
ReactRegistry.endRegisterComponent()

Navigator.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'Home' } }],
  },
})
`,
  },
  {
    name: () => 'App.tsx',
    content: ({ name }) => `/**
* Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native'
import { withNavigationItem } from 'react-native-navigation-hybrid'
import { Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'

export default withNavigationItem({
  titleItem: {
    title: 'MyProject',
  },
  rightBarButtonItem: {
    title: 'push',
    action: navigator => navigator.push('Home'),
  },
})(App)

function App() {
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          {(global as any).HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this screen and then
                come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})
`,
  },
  {
    name: () => '.gitignore',
    content: () => `# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace
IDEWorkspaceChecks.plist

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
.project
*/.settings/

# node.js
#
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\\.buckd/
*.keystore
!debug.keystore

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

*/fastlane/report.xml
*/fastlane/Preview.html
*/fastlane/screenshots

# Bundle artifact
*.jsbundle

# CocoaPods
/ios/Pods/
`,
  },
  {
    name: () => '.gitattributes',
    content: () => `*.pbxproj -text
`,
  },
  {
    name: () => '.eslintrc.js',
    content: () => `module.exports = {
  root: true,
  extends: ['@gfez/react-native', 'plugin:prettier/recommended', 'prettier/react'],
}`,
  },
  {
    name: () => '.prettierrc.js',
    content: () => `module.exports = {
  semi: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
}`,
  },
  {
    name: () => 'babel.config.js',
    content: () => {
      return `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
}
`
    },
  },
  {
    name: () => 'metro.config.js',
    content: () => {
      return `/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
}
`
    },
  },
  {
    name: () => 'tsconfig.json',
    content: () => `{
"compilerOptions": {
  /* Basic Options */
  "resolveJsonModule": true,
  "skipLibCheck": true,
  "target": "esnext" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
  "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
  "lib": ["ES2018"] /* Specify library files to be included in the compilation. */,
  "allowJs": true /* Allow javascript files to be compiled. */,
  // "checkJs": true,                       /* Report errors in .js files. */
  "jsx": "react-native" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
  // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
  // "sourceMap": true,                     /* Generates corresponding '.map' file. */
  // "outFile": "./",                       /* Concatenate and emit output to single file. */
  // "outDir": "./",                        /* Redirect output structure to the directory. */
  // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
  // "removeComments": true,                /* Do not emit comments to output. */
  "noEmit": true /* Do not emit outputs. */,
  // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
  // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
  "isolatedModules": true /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */,

  /* Strict Type-Checking Options */
  "strict": true /* Enable all strict type-checking options. */,
  // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
  // "strictNullChecks": true,              /* Enable strict null checks. */
  // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
  // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
  // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
  // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

  /* Additional Checks */
  // "noUnusedLocals": true,                /* Report errors on unused locals. */
  // "noUnusedParameters": true,            /* Report errors on unused parameters. */
  // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
  // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

  /* Module Resolution Options */
  "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
  "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
  // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
  // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
  // "typeRoots": [],                       /* List of folders to include type definitions from. */
  // "types": [],                           /* Type declaration files to be included in compilation. */
  "allowSyntheticDefaultImports": true /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */,
  "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
  // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

  /* Source Map Options */
  // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
  // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
  // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
  // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

  /* Experimental Options */
  // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
  // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
},
"exclude": ["node_modules", "babel.config.js", "metro.config.js", "jest.config.js"]
}
    `,
  },
]
