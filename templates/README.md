# __APP_NAME__

基于 React Native 0.83 + hybrid-navigation 的模板项目。

## 如何启动项目

### 环境要求

- Node >= 20
- Ruby >= 2.6.10（iOS 需 CocoaPods）
- Android：JDK 17，Android Studio
- iOS：Xcode，CocoaPods

### 安装依赖

```bash
yarn install
```

### iOS 额外步骤

```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

### 启动开发服务

```bash
yarn start
```

新开终端运行应用：

```bash
# Android
yarn android

# iOS
yarn ios
```

## Hybrid Navigation

本项目使用 [hybrid-navigation](https://github.com/listenzz/hybrid-navigation) 作为导航方案：

- **原生导航组件**：使用原生导航实现 RN 页面间跳转，性能更好、体验更接近原生
- **原生与 RN 混合**：原生页面与 RN 页面共享路由，互相跳转和传参简单
- **内置容器**：支持 stack、tabs、drawer 等标准容器，也可自定义
- **Deep Link**：支持通过链接打开指定页面

文档与进阶用法请查看：[Hybrid Navigation 文档](https://todoit.tech/rn/hybrid-navigation/)
