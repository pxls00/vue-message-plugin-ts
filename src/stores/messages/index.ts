import { ref } from 'vue'
import { defineStore } from 'pinia'

import type MessageItem from '@/interfaces/messages/message-item'
import type PositionMessages from '@/interfaces/types/position'
import type MessageItemWait from '@/interfaces/messages/message-item-wait'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<MessageItem[]>([])
  const isWait = ref<boolean>(false)
  const wait = ref<MessageItemWait | null>(null)
  const position = ref<PositionMessages>('top-right')

  function newMessage (message: MessageItem): void {
    messages.value.push(message)

    if (message.duration) {
      setTimeout(() => removeMessage(message), message.duration)
    }
  }

  function removeMessage (message: MessageItem): void {
    messages.value = messages.value.filter(
      (item: MessageItem): boolean => item.id !== message.id
      )
  }

  function waitAction (message?: MessageItemWait) {
    if (message) {
      wait.value = message
      wait.value.type = 'wait'
    }
    isWait.value = true
  }

  function unwaitAction () {
    wait.value = null
    isWait.value = false
  }

  return {
    messages,
    wait,
    position,
    isWait,
    removeMessage,
    newMessage,
    waitAction,
    unwaitAction,
  }
})
