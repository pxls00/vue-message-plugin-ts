import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.scss'

import App from './App.vue'

const app = createApp(App)

// pinia
const pinia = createPinia()
app.use(pinia)

// messages
import message from '@/plugins/message'
app.use(message)

app.mount('#app')
