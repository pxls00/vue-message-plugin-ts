import { useMessageStore } from '../store'

import createMessage from '../helpers/generate-message'
import MessagesList from '../base/index.vue'

import type {
  IMessageItem,
  IMessageWait,
  IMessageBase,
  IMessagesOption,
  IMessagesPlugin,
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

    function removeMessage(message: IMessageItem): void {
      store.removeMessage(message)
    }

    function waitAction(message?: IMessageWait): void {
      store.waitAction(message)
    }

    function stopAction(): void {
      store.unwaitAction()
    }

    const message: IMessagesPlugin = {
      addNewMessage,
      removeMessage,
      waitAction,
      stopAction,
    }

    app.provide('message', message)
    app.component('VMessage', MessagesList)
    app.config.globalProperties.$message = message
  },
}
