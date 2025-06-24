import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import de from '@/locale/de.json'
import en from '@/locale/en.json'
import es from '@/locale/es.json'

import App from './App.vue'
import router from './router'
import './style.css'


const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    de
  }
})

const app = createApp(App)
app.use(router)
app.use(i18n)

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
})

app.mount('#app')
