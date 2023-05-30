import { useMessageStore } from '../store'

import createMessage from '../helpers/generate-message'
import MessagesList from '../base/index.vue'

import type {
  IMessageItem,
  IMessageBase,
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

    function addNewMessage(message: IMessageBase): void {
      const createdMessage: IMessageItem = createMessage(message)

      store.newMessage(createdMessage)
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
