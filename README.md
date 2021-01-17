# react-native-create-app

一行命令创建 React Native 项目，并和 [hybrid-navigation](https://github.com/listenzz/hybrid-navigation) 集成。

## Installation

```
$ npm install -g react-native-create-app
```

## Command-line usage

Navigate into an empty directory to execute the command.

```
$ react-native-create-app MyApp
```

This will create the folder `MyApp` in which the project will be created in.

```
Usage: react-native-create-app [options] <projectName>

creates a react native project.

Options:
  -V, --version                      output the version number
  -p, --package-identifier [string]  Application Id on Android or Bundle Identifier on iOS (default: "com.example.(projectName in lower case)")
  -d, --directory [string]           Uses a custom directory instead of `<projectName>`
  --license [string]                 The license type (default: "MIT")
  -h, --help                         output usage information
```

## License

[MIT](./LICENSE)
