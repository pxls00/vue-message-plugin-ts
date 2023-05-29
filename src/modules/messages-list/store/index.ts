import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  IMessageItem,
  IMessageWait,
} from '@/modules/messages-list/components/messages-item/index.types'
import type { EPositionMessages } from '@/modules/messages-list/index.types'

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<IMessageItem[]>([])
  const isWait = ref<boolean>(false)
  const wait = ref<IMessageWait | null>(null)
  const position = ref<keyof typeof EPositionMessages>('top-right')

  function newMessage(message: IMessageItem): void {
    messages.value.push(message)
    if (message.duration) {
      setTimeout(() => removeMessage(message), message.duration)
    }
  }

  function removeMessage(message: IMessageItem): void {
    messages.value = messages.value.filter(
      (item: IMessageItem): boolean => item.id !== message.id
    )
  }

  function waitAction(message?: IMessageWait) {
    if (message) {
      wait.value = message
      wait.value.type = 'wait'
    }
    isWait.value = true
  }

  function unwaitAction() {
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
