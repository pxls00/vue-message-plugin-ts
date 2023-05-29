import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import '@/assets/styles/main.scss'

import App from './App.vue'

const app = createApp(App)
// some cahnges
// pinia
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
