import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.scss'

// messages plugin
import message from 'test-vue-message-plugin'
import 'test-vue-message-plugin/dist/style.css'
// messages
// import toast from '@/plugins/message'
// import MessagesList from '@/components/messages-list.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(message)
// app.use(toast)
// app.component('AppMessages', MessagesList)

app.mount('#app')
