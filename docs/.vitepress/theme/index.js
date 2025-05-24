import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件或其他增强功能
  }
}
