import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/main.scss'

const app = createApp(App)

// Messages plugin
import AppMessage from 'vue-message-plugin-ts'
import 'vue-message-plugin-ts/dist/style.css'

app.use(AppMessage, {
  position: 'bottom-center'
})

app.mount('#app')
