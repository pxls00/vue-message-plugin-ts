import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import AppMessage from 'test-vue-message-plugin'
// import 'test-vue-message-plugin/dist/style.css'

import './assets/main.scss'

// messages
import toast from '@/plugins/message'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
// app.use(AppMessage)
app.use(toast)

app.mount('#app')
