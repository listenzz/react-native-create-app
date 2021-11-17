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
  "dependencies": {
    "react": "17.0.2",
    "react-native": "^0.66.3",
    "react-native-fast-image": "^8.1.5",
    "hybrid-navigation": "^2.5.1"
  },
  "devDependencies": {
    "@babel/core": "^7.16.0",
    "@babel/runtime": "^7.16.0",
    "@react-native-community/eslint-config": "^3.0.0",
    "@types/jest": "^27.0.1",
    "@types/react": "^17.0.15",
    "@types/react-native": "^0.66.0",
    "@types/react-test-renderer": "17.0.1",
    "babel-jest": "^27.0.6",
    "jest": "^27.0.6",
    "metro-react-native-babel-preset": "^0.66.2",
    "react-native-testing-library": "^6.0.0",
    "react-test-renderer": "17.0.2",
    "typescript": "^4.3.5"
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
import { ReactRegistry, Garden, Navigator } from 'hybrid-navigation'
import { Platform } from 'react-native'

// 配置全局样式
Garden.setStyle({
  topBarStyle: 'dark-content',
  statusBarColorAndroid: Platform.Version > 21 ? undefined : '#4A4A4A',
})

// 重要必须
ReactRegistry.startRegisterComponent()

// 注意，你的每一个页面都需要注册
ReactRegistry.registerComponent('App', () => App)

// 重要必须
ReactRegistry.endRegisterComponent()

Navigator.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'App' } }],
  },
})
`,
  },
  {
    name: () => 'App.tsx',
    content: ({ name }) => `import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'

interface Props {
  name: string
}

function Welcome(props: Props) {
  return <Text style={styles.text}>Hello {props.name}!</Text>
}

function App() {
  const [name, setName] = useState('Sara')
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <Welcome name={name} />
      <TextInput value={text} onChangeText={setText} style={styles.input} />
      <Button title="确定" onPress={() => setName(text)} />
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: '${name}',
  },
  rightBarButtonItem: {
    title: 'push',
    action: navigator => navigator.push('App'),
  },
})(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    margin: 8,
  },
  input: {
    height: 40,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
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
*.hprof
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
  extends: ['@react-native-community', 'plugin:prettier/recommended', 'prettier/react'],
  overrides: [
    {
      files: ['jest/*'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-shadow': 0,
    'no-bitwise': 0,
    'react-native/no-inline-styles': 0,
  },
}`,
  },
  {
    name: () => '.prettierrc.js',
    content: () => `module.exports = {
  semi: false,
  trailingComma: 'all',
  jsxBracketSameLine: true,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  arrowParens: 'avoid'
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
        inlineRequires: true,
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
  {
    name: () => '.vscode/extensions.json',
    content: () => {
      return `{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "eamodio.gitlens",
    "editorconfig.editorconfig"
  ]
}
`
    },
  },
  {
    name: () => '.vscode/settings.json',
    content: () => {
      return `{
  "[javascript]": {
    "editor.formatOnSave": false,
    "editor.tabSize": 2
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false,
    "editor.tabSize": 2
  },
  "[typescript]": {
    "editor.formatOnSave": false,
    "editor.tabSize": 2
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false,
    "editor.tabSize": 2
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "eslint.format.enable": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
`
    },
  },
  {
    name: () => '.npmrc',
    content: () => {
      return `registry=https://registry.npm.taobao.org/
`
    },
  },
]
