import { useMessageStore } from '../store'

import MessagesList from '../base/index.vue'

import type {
  IMessageItem,
  IMessagesOption,
  IMessagesPlugin,
  TMessageId,
} from '../index.types'

export default {
  install: (app: any, options?: IMessagesOption) => {
    const store = useMessageStore()

    if (options?.position) {
      store.position = options.position
    }

    function addNewMessage(message: IMessageItem): void {
      store.newMessage(message)
    }

    function removeMessage(id: TMessageId): void {
      store.removeMessage(id)
    }

    function startWait(message?: IMessageItem): void {
      store.startWait(message)
    }

    function stopWait(id?: TMessageId): void {
      store.stopWait(id)
    }

    const message: IMessagesPlugin = {
      addNewMessage,
      removeMessage,
      startWait,
      stopWait,
    }

    app.provide('message', message)
    app.component('VMessage', MessagesList)
    app.config.globalProperties.$message = message
  },
}
