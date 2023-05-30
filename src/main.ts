import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import '@/assets/styles/main.scss'

import App from './App.vue'

const app = createApp(App)

import { MessagesPlugin } from '@/modules/messages-list'

// pinia
const pinia = createPinia()
app.use(pinia)

app.use(MessagesPlugin)

app.mount('#app')
