# react-native-create-app

一行命令创建 React Native 项目，并和 [react-native-navigation-hybrid](https://github.com/listenzz/react-native-navigation-hybrid) 集成。

## Installation

需要社区版的 cli

卸载旧版 react-native-cli

```
npm uninstall -g react-native-cli

```

安装社区版 cli

```
npm i -g @react-native-community/cli
```

clone 本库

```
git clone git@github.com:listenzz/react-native-create-app.git
```

cd 到本库根目录

如果之前安装过，先卸载

```
$ npm uninstall -g react-native-create-app
```

安装本库

```
$ npm install -g .
```

## Command-line usage

Navigate into an empty directory to execute the command.

```
$ react-native-create-app MyApp
```

This will create the folder `MyApp` in which the project will be created in.

```
Usage: react-native-create-app [options] <name>

creates a react native project.

Options:
  -V, --version                                 output the version number
  -p, --package-identifier [packageIdentifier]  Application Id on Android or Bundle Identifier on iOS (default: "com.example.(name in lower case)")
  -d, --project-dir [projectDir]                The project dir name (default: "Same as the project name")
  --license [license]                           The license type (default: "MIT")
  -h, --help                                    output usage information
```

## License

[MIT](./LICENSE)
