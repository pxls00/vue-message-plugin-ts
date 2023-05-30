import { createPinia, type Pinia } from 'pinia'
import { MessagesList, MessagesPlugin } from '@/modules/messages-list'

import type { IMessagesOption } from '@/modules/messages-list/index.types'

export default {
  install: (app: any, options?: IMessagesOption) => {
    app.component('AppMessages', MessagesList)
    const pinia = createPinia() as Pinia
    app.use(pinia)
    app.use(MessagesPlugin, options)
  },
}
