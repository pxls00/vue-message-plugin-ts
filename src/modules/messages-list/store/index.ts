import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MESSAGE_WAIT_ACTION_CREDENTIALS } from '@/modules/messages-list/constants/default-data'
import checkIsNotExistsMessage from '@/modules/messages-list/helpers/check-is-not-exists-message'

import type { IMessageItem } from '@/modules/messages-list/index.types'
import type {
  EPositionMessages,
  TMessageId,
} from '@/modules/messages-list/index.types'

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<IMessageItem[]>([])
  const position = ref<keyof typeof EPositionMessages>('top-right')

  function newMessage(message: IMessageItem): void {
    if (checkIsNotExistsMessage(message, messages.value)) {
      if (message.type == 'wait') {
        messages.value.unshift(message)
      } else {
        messages.value.push(message)
      }
      if (message.duration) {
        setTimeout(() => removeMessage(message.id), message.duration)
      }
    }
  }

  function removeMessage(id: TMessageId): void {
    messages.value = messages.value.filter(
      (item: IMessageItem): boolean => item.id !== id
    )
  }

  function startWait(message?: IMessageItem): void {
    if (message) {
      if (message.type === 'wait') {
        newMessage(message)
      }
    } else {
      newMessage(MESSAGE_WAIT_ACTION_CREDENTIALS)
    }
  }

  function stopWait(id?: TMessageId) {
    if (!id) {
      removeMessage(MESSAGE_WAIT_ACTION_CREDENTIALS.id)
    } else {
      removeMessage(id)
    }
  }

  return {
    messages,
    position,
    removeMessage,
    newMessage,
    startWait,
    stopWait,
  }
})
