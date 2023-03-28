import MessagesList from '@/components/messages-list.vue'
import { createPinia } from 'pinia'
import MessagePlugin from '@/plugins/message'

export default {
  install: (app: any) => {
    app.component('AppMessages', MessagesList)
    const pinia = createPinia()

    app.use(pinia)
    app.use(MessagePlugin)
  },
}
