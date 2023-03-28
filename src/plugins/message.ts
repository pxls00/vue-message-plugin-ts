import { useMessagesStore } from '@/stores/messages'
import createMessage from '@/stores/messages/helpers/message-create'

import type NewMessageItem from '@/interfaces/messages/new-message-item'
import type MessageItem from '@/interfaces/messages/message-item'
import type Message from '@/interfaces/messages/message-plugin'

export default {
  install: (app: any) => {
    const store = useMessagesStore()

    function addNewMessage (message: NewMessageItem): void {
      const createdMessage: MessageItem = createMessage(message)

      store.newMessage(createdMessage)
    }

    function removeMessage (message: MessageItem): void {
      store.removeMessage(message)
    }

    function waitAction (): void {
      store.waitAction()
    }

    function stopAction (): void {
      store.unwaitAction()
    }

    const message: Message = {
      addNewMessage,
      removeMessage,
      waitAction,
      stopAction,
    }

    app.provide('message', message)
    app.config.globalProperties.$message = message
  },
}