import type CodeItem from '@/interfaces/code-item'

const code: CodeItem = {
  script: `// main.js

import { createApp, h } from 'vue'
import Message from 'vue-message-plugin-ts'
import 'vue-message-plugin-ts/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(Message)
// or
app.use(Message as Message, options?: { position?: PositionMessages } as MessagesOption)

app.mount('#app')`,

  template: `// App.vue

<template>
  <app-messages />
  <router-view />
</template>`,

  style: '',
}

export default code
