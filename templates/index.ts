import App from './App'
import Navigation, { BarStyleDarkContent } from 'hybrid-navigation'

// 配置全局样式
Navigation.setDefaultOptions({
  topBarStyle: BarStyleDarkContent,
})

// 重要必须
Navigation.startRegisterComponent()

// 注意，你的每一个页面都需要注册
Navigation.registerComponent('App', () => App)

// 重要必须
Navigation.endRegisterComponent()

Navigation.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'App' } }],
  },
})
