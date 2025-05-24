import DefaultTheme from 'vitepress/theme'
import FullPageHero from './components/FullPageHero.vue';

import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData  }) {
    app.component('FullPageHero', FullPageHero)
  }
}
